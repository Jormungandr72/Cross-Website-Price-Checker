import { FormControl, InputLabel, Select, MenuItem, ListItemText } from '@mui/material';

const DropDown = ({ storeFilters, stores, handleFilterChange }) => {
    return (
        <div>
             <FormControl fullWidth>
                <InputLabel id="store-select-label">Select Stores</InputLabel>
                <Select
                    labelId="store-select-label"
                    multiple
                    value={storeFilters}
                    label="Select Stores"
                    onChange={handleFilterChange}
                    renderValue={(selected) => {
                    return selected
                        .map((id) => stores.find((store) => store.store_id === id)?.store_name)
                        .join(", ");
                    }}
                >
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

export default DropDown;