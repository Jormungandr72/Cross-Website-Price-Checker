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
JC   2025-04-06     added material UI and improved accessibility features 
-------------------------------------------------------------------------------
*/

import { FormControl, InputLabel, Select, MenuItem, ListItemText } from '@mui/material';

const DropDownSingle = ({ storeFilters, stores, handleFilterChange }) => {
    if (!stores) {
        console.error("Stores is undefined")
        return <div>Error fetching stores</div>
    }
    
    return (
        <div>
            <FormControl sx={{ width: 600 }}>
                <InputLabel id="store-select-label">Select Store</InputLabel>
                <Select
                    labelId="store-select-label"
                    multiple={false}
                    value={storeFilters}
                    label="Select Store"
                    onChange={handleFilterChange} 
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 45 * 5.5
                            },
                        },
                    }}

                    renderValue={(selected) => {
                        const selectedStore = stores.find((store) => store.store_id === selected);
                        return selectedStore ? selectedStore.store_name : '';
                    }}
                >
                    {/* None Value Option */}
                    <MenuItem value="">
                        <ListItemText primary="- None -"/>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText primary="- All -"/>
                    </MenuItem>
                    {stores.map((store) => (
                    <MenuItem key={store.store_id} value={store.store_id}>
                        <ListItemText primary={store.store_name} />
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default DropDownSingle;