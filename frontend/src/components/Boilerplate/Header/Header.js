import './Header.css';
import React, { useState } from 'react';
import LoggingPanel from '../../LoggingPanel/LoggingPanel';
import {useNavigate} from "react-router-dom";
import {Menu, MenuItem, IconButton} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import {themes} from '../../../theme';

export default function Header({theme, changeTheme}) {
    let navigate = useNavigate();
    const [showLogs, setShowLogs] = useState(false);
    const [menuActionsList, setMenuActionsList] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [logoMenuAnchor, setLogoMenuAnchor] = useState(null);
    const [logoActionsList, setLogoActionsList] = useState(false);
    const [current_theme, setCurrentTheme] = useState(localStorage.getItem("theme"));

    const handleNavigateHome = () => {
        navigate("/flowsheets", {replace: true})
    }

    const handleShowLogs = () => {
        setShowLogs(!showLogs)
        setMenuActionsList(false)
    }

    const handleShowActions = (event) => {
        setMenuActionsList(!menuActionsList)
        setMenuAnchorEl(event.currentTarget);
    }

    const handleShowLogoActions = (event) => {
        if (process.env.NODE_ENV === 'development') {
            setLogoActionsList(!logoActionsList)
            setLogoMenuAnchor(event.currentTarget);
        }
    }

    const getLogoStyle = () => {
        const logoStyle = {color: theme.header.color}
        if (process.env.NODE_ENV === 'development') logoStyle.cursor = 'pointer';
        return logoStyle;
    }

    return (
        <div id="Header">
            <div className="titlebar"
                 style={{background: theme.header.background}}>
                <div id="logo" style={{
                    cursor: 'pointer',
                    background: theme.header.logoBackground
                }} onClick={handleNavigateHome}>
                    <img  data-testid="project-logo" src={theme.logoOnly} alt={`${theme.project} logo`}/>
                </div>
                <div id="titlebar-name" style={getLogoStyle()} onClick={handleShowLogoActions}>
                    {theme.projectTitle}
                    <Menu
                        id="actions-list"
                        anchorEl={logoMenuAnchor}
                        open={logoActionsList}
                        onClose={() => setLogoActionsList(false)}
                    >
                        {process.env.NODE_ENV === 'development' && (
                            Object.keys(themes).map((key, idx) => {
                                if (key !== current_theme && key !== "watertap") return (
                                    <MenuItem key={`logo_${key}`} className="change_theme" onClick={() => changeTheme(key)}>Switch to {key.replace("nawi", "watertap")}</MenuItem>
                                )
                            })
                        )}
                    </Menu>
                </div>
                <div className="right">
                    <IconButton className="header-actions" style={{color: theme.menuButton.color}} onClick={handleShowActions}>
                        <ListIcon/>
                    </IconButton>
                    <Menu
                        id="actions-list"
                        anchorEl={menuAnchorEl}
                        open={menuActionsList}
                        onClose={() => setMenuActionsList(false)}
                    >
                        <MenuItem className="view-logs" onClick={handleShowLogs}>View Logs</MenuItem>
                        {process.env.NODE_ENV === 'development' && (
                            Object.keys(themes).map((key, idx) => {
                                if (key !== current_theme && key !== "watertap") return (
                                    <MenuItem key={`menu_${key}`} className="change_theme" onClick={() => changeTheme(key)}>Switch to {key.replace("nawi", "watertap")}</MenuItem>
                                )
                            })
                        )}
                        <MenuItem className="return-home" onClick={handleNavigateHome}>Return to list page</MenuItem>
                    </Menu>
                </div>
            </div>
            <LoggingPanel open={showLogs} onClose={handleShowLogs}/>
        </div>
    )
}

