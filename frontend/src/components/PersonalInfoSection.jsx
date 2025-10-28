import React from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { useLanguage } from '../contexts/LanguageContext'

/**
 * @param {Object} props
 * @param {string} props.textValue - The current text value from parent state
 * @param {function} props.setTextValue - The state setter function from parent
 */
export const PersonalInfoSection = ({ textValue, setTextValue }) => {
  const { translate } = useLanguage()

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: '600',
          mb: 1.5,
          color: 'text.primary',
        }}
      >
        {translate('Your Personal Information:')}
      </Typography>

      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={8}
        id="personal-info-textarea"
        label={translate('Your details')}
        placeholder={translate('Name, phone, address...')}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: 'background.paper',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
        }}
      />
    </Box>
  )
}

export default PersonalInfoSection
