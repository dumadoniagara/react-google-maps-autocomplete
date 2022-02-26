import React from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default Location = (props) => {
    const state = useSelector(state => state);
    return (
        <Box sx={{ maxWidth: 650, color: '#eaeaea', marginTop: 5, paddingLeft: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant="subtitle2">
                    Address:
                </Typography>
                <Typography variant="overline" gutterBottom>
                    {state?.address}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant="subtitle2">
                    Latitude:
                </Typography>
                <Typography variant="overline" gutterBottom>
                    {state?.coordinate?.lat}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant="subtitle2">
                    Longitude:
                </Typography>
                <Typography variant="overline" gutterBottom>
                    {state?.coordinate?.lng}
                </Typography>
            </Box>
        </Box>
    )
}