/*
-------------------------------------------------------------------------------
Program:    dropdown.js
Author:     Justin Clark
Date:       2025-04-04
Language:   JavaScript
Purpose:    This component is a dropdown menu that allows users to select multiple stores.
-------------------------------------------------------------------------------
Change Log:
Who  When           What
JC   2025-04-04     created the dropdown component
JC   2025-04-05     added functionality to handle multiple selections and display selected values
JC   2025-04-06      added material UI and improved accessibility features
-------------------------------------------------------------------------------
*/

import { FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox } from '@mui/material';

const DropDown = ({ storeFilters, stores, handleFilterChange }) => {
    return (
        <div>
            <FormControl sx={{ width: 600 }}>
                <InputLabel id="store-select-label">Select Stores</InputLabel>
                <Select
                    labelId="store-select-label"
                    multiple
                    value={storeFilters}
                    label="Select Stores"
                    onChange={handleFilterChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 45 * 5.5
                            },
                        },
                    }}

                    renderValue={(selected) => {
                    return selected
                        .map((id) => stores.find((store) => store.store_id === id)?.store_name)
                        .join(", ");
                    }}
                >
                    {stores.map((store) => (
                    <MenuItem key={store.store_id} value={store.store_id}>
                        <Checkbox checked={storeFilters.indexOf(store.store_id) > -1} />
                        <ListItemText primary={store.store_name} />
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default DropDown;