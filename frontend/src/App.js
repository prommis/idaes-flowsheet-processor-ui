import './App.css';
import React, {useEffect, useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SplashPage from './views/SplashPage/SplashPage';
import {setProject} from "./services/flowsheet.service";
import MainContent from "./components/MainContent/MainContent";
import {themes} from './theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
    const [connectedToBackend, setConnectedToBackend] = useState(false);
    const [numberOfSubprocesses, setNumberOfSubprocesses] = useState({})
    const [checkAgain, setCheckAgain] = useState(1)

    /* 
        if in dev mode, first check for theme in local storage because we allow for toggling between themes in dev mode
        if not found or not in dev mode, check for environment variable. 
        if not found, use watertap as default
    */
    const default_project_name = 'watertap'
    const env_project_name = import.meta.env.VITE_PROJECT
    const stored_project_name = localStorage.getItem("theme")
    console.debug("Project names, in order of precedence: env:", env_project_name,
        ", stored:", stored_project_name, ", default:", default_project_name)
    let project_name = env_project_name || stored_project_name || default_project_name
    console.debug("Resulting project name:", project_name)
    if (!["watertap", "prommis", "idaes", "idaes-pse", "nawi"].includes(project_name)) {
        project_name = "watertap"
    }
    let theme = themes[project_name]

    const WAIT_TIME = 1
    const MAX_RETRIES = 30

    // use Material UI theme for styles to be consistent throughout app
    const mui_theme = createTheme({
        palette: {
            primary: {
                main: theme?.button.background,
            },
        },
    });
    useEffect(() => {
        if (checkAgain !== 0)
        {
            if (checkAgain > MAX_RETRIES) {
                _logError(`Failed to connect to backend after ${MAX_RETRIES} attempts`)
                // Show error UI or exit gracefully
                return
            }
            setProject(theme.project.toLowerCase())
            .then((data) => {
                localStorage.setItem("theme", theme.project.toLowerCase())
                setConnectedToBackend(true);
                setCheckAgain(0)
            }).catch((e) => {
                if (checkAgain > 5) console.warn(`Attempting to connect to backend (attempt ${checkAgain}/${MAX_RETRIES}): ${e}`)
                setTimeout(() => {
                    setCheckAgain(checkAgain+1)
                }, WAIT_TIME * 1000)
            });
        }
    }, [checkAgain]);

    const changeTheme = (new_theme) => {
        localStorage.setItem("theme", new_theme)
        window.location.hash = "#/flowsheets";
        window.location.reload();
    }

    const subProcState = {value: numberOfSubprocesses, setValue: setNumberOfSubprocesses}
    return (

        <ThemeProvider theme={mui_theme}>
            <div className="App">
                <MainContent theme={theme} connectedToBackend={connectedToBackend}
                            subProcState={subProcState} changeTheme={changeTheme}/>
                <SplashPage theme={theme} connectedToBackend={connectedToBackend}/>
            </div>
        </ThemeProvider>
    )
}


export default App;
