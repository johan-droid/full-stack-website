import React from 'react'
import { Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useLanguage } from '../contexts/LanguageContext'

export const OrganizationSearch = () => {
  const { translate } = useLanguage()

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        my: 3,
      }}
    >
      <TextField
        variant="outlined"
        fullWidth
        placeholder={translate('Search workers by name, skills, or job type...')}
        sx={{
          maxWidth: '600px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px',
            backgroundColor: 'background.paper',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ pl: 1.5, color: 'action.active' }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default OrganizationSearch
