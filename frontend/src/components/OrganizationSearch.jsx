import React from 'react'
import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

// This component is now "controlled"
// It receives the value and the change handler from its parent (OrganizationHome)
export const OrganizationSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '50px', // This creates the rounded "pill" shape
      padding: '8px 16px',
      width: '100%',
      // Optional: a subtle shadow to make it pop, like in M3
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
    }}>
      {/* Search Icon */}
      <SearchIcon sx={{ 
        color: 'grey.600', // A medium-gray for the icon
        mr: 1.5 // Margin-right to add space
      }} />

      {/* Input Field */}
      <InputBase
        fullWidth
        placeholder="Search workers by name, skills, or job type..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          color: 'black',
          '& .MuiInputBase-input': {
            color: 'black',
          },
          // Styles the placeholder text
          '& .MuiInputBase-input::placeholder': {
            color: 'grey.500',
            opacity: 1,
          },
          '& .MuiInputBase-input:-webkit-autofill': {
            WebkitTextFillColor: 'black',
            WebkitBoxShadow: '0 0 0 30px white inset',
          },
          '& .MuiInputBase-input.Mui-focused': {
            color: 'black',
          }
        }}
        inputProps={{
          style: {
            color: 'black',
            backgroundColor: 'white',
          },
        }}
      />
    </Box>
  );
};