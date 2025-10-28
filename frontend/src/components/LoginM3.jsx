import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Phone, Lock, Visibility, VisibilityOff } from '@mui/icons-material'

export const LoginM3 = () => {
  const { translate } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((s) => !s)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#0033a0',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
        {translate('Welcome Back!')}
      </Typography>
      <Typography sx={{ color: 'white', mb: 4 }}>{translate('Sign in to continue your journey')}</Typography>

      <Paper
        elevation={4}
        sx={{
          padding: { xs: 3, md: 4 },
          borderRadius: '28px',
          width: '100%',
          maxWidth: '450px',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ textAlign: 'center', fontWeight: '600', mb: 4, color: '#333' }}
        >
          {translate('Individual Login')}
        </Typography>

        <Box component="form" noValidate>
          <TextField
            label={translate('Phone number')}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={translate('Password')}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'action.active' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link
            href="#"
            variant="body2"
            sx={{ display: 'block', textAlign: 'right', mt: 1, mb: 3, textDecoration: 'none', color: 'primary.main' }}
          >
            {translate('Forgot password?')}
          </Link>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ borderRadius: '50px', padding: '12px 0', fontWeight: 'bold', textTransform: 'none', fontSize: '1.1rem', mt: 2 }}
          >
            {translate('LOGIN')}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginM3
