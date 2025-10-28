import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from '@mui/material'
import { ArrowBack, UploadFile, DeleteOutline } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const EditProfile = () => {
  const { translate } = useLanguage()
  const [profilePic, setProfilePic] = useState(null)

  const handleGoBack = () => {
    console.log('Go Back Clicked')
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(URL.createObjectURL(event.target.files[0]))
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0A4DFF' }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#0A4DFF' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleGoBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {translate('Edit Profile')}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ padding: { xs: 3, md: 5 }, borderRadius: '28px', width: '100%' }}>
          <SectionHeader title={translate('Profile Picture')} subtitle={translate('Upload a professional photo of yourself')} />

          <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
            <Grid item>
              <Avatar src={profilePic} sx={{ width: 80, height: 80, bgcolor: 'grey.300' }}>
                {!profilePic && <AccountCircleIcon sx={{ fontSize: '4rem', color: 'grey.500' }} />}
              </Avatar>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" component="label" startIcon={<UploadFile />} sx={{ borderRadius: '50px', textTransform: 'none' }}>
                  {translate('Upload Photo')}
                  <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteOutline />} sx={{ borderRadius: '50px', textTransform: 'none' }} onClick={() => setProfilePic(null)}>
                  {translate('Remove')}
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <SectionHeader title={translate('Personal Information')} subtitle={translate('Update your basic information')} />
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField label={translate('First Name')} variant="outlined" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label={translate('Last Name')} variant="outlined" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label={translate('Mobile Number')} variant="outlined" type="tel" fullWidth required />
            </Grid>
          </Grid>

          <SectionHeader title={translate('About Me')} subtitle={translate('Tell us about yourself and your professional background')} />
          <TextField
            label={translate('Bio')}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            placeholder={translate('Write a brief description about yourself, your skills, and what makes you unique...')}
            inputProps={{ maxLength: 500 }}
            helperText={translate('0/500 characters')}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' }, '& .MuiFormHelperText-root': { textAlign: 'right' } }}
          />

          <Box sx={{ mt: 5, textAlign: 'right' }}>
            <Button variant="contained" size="large" sx={{ borderRadius: '50px', px: 5, textTransform: 'none', fontSize: '1rem' }}>
              {translate('Save Changes')}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subtitle}
    </Typography>
  </Box>
)

export default EditProfile
