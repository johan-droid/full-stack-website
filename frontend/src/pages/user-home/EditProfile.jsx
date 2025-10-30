import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'
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

// Helper component for section headers
const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
      {subtitle}
    </Typography>
  </Box>
)

export const EditProfile = () => {
  const { translate } = useLanguage()
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(null)
  
  // State for all form fields
  const [formData, setFormData] = useState({
    firstName: 'HGJSHFU',
    lastName: '',
    mobile: '',
    bio: '',
  })

  // Handler to update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(URL.createObjectURL(event.target.files[0]))
    }
  }

  // --- TEXTFIELD STYLING TO FORCE BLACK COLOR ---
  const blackTextFieldSx = {
    // 💡 PRIMARY FIX: Enforcing black color for the actual typed text with !important
    '& .MuiInputBase-input': {
      color: 'black !important', 
    },
    // Force Input Label text (the * label) to BLACK
    '& .MuiInputLabel-root': {
      color: 'black !important', 
    },
    // Set helper text color to dark grey
    '& .MuiFormHelperText-root': {
      color: 'rgba(0, 0, 0, 0.6)', 
      textAlign: 'right' 
    },
    // Keep outline border color dark when not focused
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.23)', 
    },
    // Ensure bio field has rounded corners
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
    },
  };
  // ----------------------------------------------

  const bioMaxLength = 500
  const currentBioLength = formData.bio.length

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
        <Paper 
          elevation={4} 
          sx={{ 
            padding: { xs: 3, md: 5 }, 
            borderRadius: '28px', 
            width: '100%', 
            color: 'black' 
          }}
        >
          
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
              <TextField 
                label={translate('First Name')} 
                variant="outlined" 
                fullWidth 
                required 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}     
                sx={blackTextFieldSx} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label={translate('Last Name')} 
                variant="outlined" 
                fullWidth 
                required 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                sx={blackTextFieldSx} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label={translate('Mobile Number')} 
                variant="outlined" 
                type="tel" 
                fullWidth 
                required 
                name="mobile" 
                value={formData.mobile}
                onChange={handleChange}
                sx={blackTextFieldSx} 
              />
            </Grid>
          </Grid>

          <SectionHeader title={translate('About Me')} subtitle={translate('Tell us about yourself and your professional background')} />
          <TextField
            label={translate('Bio')}
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={translate('Write a brief description about yourself, your skills, and what makes you unique...')}
            inputProps={{ maxLength: bioMaxLength }}
            helperText={translate(`${currentBioLength}/${bioMaxLength} characters`)}
            sx={blackTextFieldSx}
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

export default EditProfile