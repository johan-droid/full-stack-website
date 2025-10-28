import React from 'react'
import { Box, Paper, Typography, Stack, Grid, Avatar } from '@mui/material'
import { useLanguage } from '../../contexts/LanguageContext'
import AnimatedItem from '../../components/AnimatedItem'

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const QuickActionCard = ({ icon, title, subtitle, onClick, sx = {} }) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: '20px',
        background: 'linear-gradient(90deg, #6a79ff 0%, #536dfe 100%)',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        ...sx,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>{icon}</Avatar>
        </Grid>
        <Grid item xs={9} sm={10}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

const Dashboard = () => {
  const { translate } = useLanguage()

  const quickActions = [
    {
      titleKey: 'Resume Templates',
      subtitleKey: 'Check our library of templates',
      icon: <DescriptionOutlinedIcon sx={{ color: 'white' }} />,
      delay: 0.1,
    },
    {
      titleKey: 'ATS Score',
      subtitleKey: 'Check and improve your resume score',
      icon: <AssessmentOutlinedIcon sx={{ color: 'white' }} />,
      delay: 0.2,
    },
    {
      titleKey: 'Upload Resume',
      subtitleKey: 'Upload your existing resume',
      icon: <FileUploadOutlinedIcon sx={{ color: 'white' }} />,
      delay: 0.3,
    },
    {
      titleKey: 'Edit Profile',
      subtitleKey: 'Update your personal information',
      icon: <EditOutlinedIcon sx={{ color: 'white' }} />,
      delay: 0.4,
    },
  ]

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#0033a0', minHeight: '100vh' }}>
      <AnimatedItem delay={0}>
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <MicNoneOutlinedIcon sx={{ color: 'primary.main', mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {translate('Build with Voice')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translate('Speak your details and let AI create your resume')}
            </Typography>
          </Box>
          <ChevronRightIcon sx={{ color: 'text.secondary' }} />
        </Paper>
      </AnimatedItem>

      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
        {translate('Quick Actions')}
      </Typography>

      <Stack spacing={3}>
        {quickActions.map((action) => (
          <AnimatedItem key={action.titleKey} delay={action.delay}>
            <QuickActionCard title={translate(action.titleKey)} subtitle={translate(action.subtitleKey)} icon={action.icon} />
          </AnimatedItem>
        ))}
      </Stack>
    </Box>
  )
}

export default Dashboard
