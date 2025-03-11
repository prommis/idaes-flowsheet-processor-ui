import React from 'react'; 
import {useEffect, useState} from 'react';
import { Box,Paper,Container,Grid, Accordion,Stack, AccordionSummary, AccordionDetails,Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputWrapper from "../InputWrapper/InputWrapper";
import Grid2 from '@mui/material/Unstable_Grid2';


export default function InputAccordion(props) {
    const { handleUpdateDisplayValue, handleUpdateFixed, handleUpdateBounds, handleUpdateSamples, data, solveType } = props;
    const [expanded1, setExpanded1] = useState('panel1'); 
    const [value, setValue] = useState("");

    useEffect(()=>{  
        // console.log("DDD:",data);
    }, [data]);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded1(isExpanded ? panel : false);
    };

    const handleFieldChange = (event) => {
        setValue(event.target.value);
    };

    const renderFields = () => {
        return Object.keys(data.input_variables).map((key)=>{
            let vItem = data.input_variables[key];
            return <InputWrapper 
                        key={key} 
                        fieldData={vItem} 
                        handleUpdateDisplayValue={handleUpdateDisplayValue} 
                        handleUpdateFixed={handleUpdateFixed} 
                        handleUpdateBounds={handleUpdateBounds}
                        handleUpdateSamples={handleUpdateSamples}
                        solveType={solveType}
                    />
            
        });
    };

    return (
        <Box sx={{
        marginY: 2,
        border: .5,
        borderColor: 'gray',
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        }}>
    <Typography variant="h6">
    {data.display_name}</Typography>
            {/*data.description*/}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
            >
            {
                renderFields()
            }
            </Box>
            </Box>
        
    );
}