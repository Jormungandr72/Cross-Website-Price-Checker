import { Box, TextField } from '@mui/material';

const SearchBox = ({ onSearchChange }) => {
    
    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        onSearchChange(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
                <TextField
                    label="Search"
                    variant='standard'
                    fullWidth
                    onChange={handleSearchChange}
                    sx={{ maxWidth: 400 }}
                />
            </Box>
        </div>
    )
}

export default SearchBox;