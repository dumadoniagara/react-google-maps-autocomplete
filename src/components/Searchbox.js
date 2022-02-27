import React, { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';

import { useDispatch } from 'react-redux';
import { setAddress, setFullAddress, setCoordinate } from '../redux/actions';

const autocompleteService = { current: null };

export default function SearchBox() {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;
        if (!autocompleteService.current && window.google) {
            autocompleteService.current =
                new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];
                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                dispatch(setFullAddress(results[0]))
                return getLatLng(results[0])
            })
            .then(latLng => {
                dispatch(setCoordinate(latLng))
            })
            .catch(error => console.error('Error', error));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: '10px' }}>
            <Autocomplete
                id="combo-box-searchbox"
                sx={{ width: 450 }}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    handleSelect(newValue?.description)
                    setValue(newValue);
                    dispatch(setFullAddress(newValue))
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    dispatch(setAddress(newInputValue))
                }}
                renderInput={(params) => (
                    <TextField {...params} sx={{ input: { color: '#ffffff' }, label: { color: '#ffffff' } }} label="Search location.." fullWidth />
                )}
                renderOption={(props, option) => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box
                                        component={LocationOnIcon}
                                        sx={{ color: 'text.secondary', mr: 2 }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}

                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </Box>
    );
}