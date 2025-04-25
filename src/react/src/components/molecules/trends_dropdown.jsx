import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TrendsDropDown = () => {
    const [selectedValue, setSelectedValue] = useState('option1');
    

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl 
            fullWidth
            sx={{ width: '50%', minWidth: 120 }}
        >
            <InputLabel id="trends-dropdown-label">Select Store</InputLabel>
            <Select
                labelId="trends-dropdown-label"
                value={selectedValue}
                onChange={handleChange}
                label="Select Store"
            >
                <MenuItem value="option1">Store 1</MenuItem>
                <MenuItem value="option2">Store 2</MenuItem>
                <MenuItem value="option3">Store 3</MenuItem>
            </Select>
        </FormControl>
    );
}

export default TrendsDropDown;