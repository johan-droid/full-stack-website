import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import TutorialPage from './pages/tutorial/TutorialPage.jsx';
import GuestUserPage from './pages/guest-user/GuestUserPage.jsx';
import GuestTemplatesPage from './pages/guest-user/templates/GuestTemplatesPage.jsx';
import GuestATSScorePage from './pages/guest-user/ats-score/GuestATSScorePage.jsx';
import IndividualLogin from './pages/user-auth/login/UserLogin.jsx';
import IndividualRegister from './pages/user-auth/register/UserRegister.jsx';
import OrganizationLogin from './pages/organization-auth/login/OrganizationLogin.jsx';
import OrganizationRegister from './pages/organization-auth/register/OrganizationRegister.jsx';
import UserHome from './pages/user-home/UserHome.jsx';
import TemplatesPage from './pages/user-home/templates/TemplatesPage.jsx';
import ATSScorePage from './pages/user-home/ats-score/ATSScorePage.jsx';
import VoiceBuilder from './pages/user-home/voice-builder/VoiceBuilder.jsx';
import ResumeGenerator from './pages/user-home/resume-generator/ResumeGenerator.jsx';
// Corrected Import Path Below: removed '/profile' from the path
import EditProfile from './pages/user-home/EditProfile.jsx';
import OrganizationHome from './pages/organization-home/OrganizationHome.jsx';
import OrganizationEditProfile from './pages/organization-home/profile/OrganizationEditProfile.jsx';
import PaymentHistory from './pages/organization-home/payment/PaymentHistory.jsx';
// Make sure LanguageSelection is imported if you have a route for it
// import LanguageSelection from './pages/language-selection/LanguageSelection.jsx';


function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<TutorialPage />} />
        {/* Add route for LanguageSelection if needed, maybe before tutorial? */}
        {/* <Route path="/language-selection" element={<LanguageSelection />} /> */}
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/guest-user" element={<GuestUserPage />} />
        <Route path="/guest-templates" element={<GuestTemplatesPage />} />
        <Route path="/guest-ats-score" element={<GuestATSScorePage />} />
        <Route path="/individual-login" element={<IndividualLogin />} />
        <Route path="/individual-register" element={<IndividualRegister />} />
        <Route path="/organization-login" element={<OrganizationLogin />} />
        <Route path="/organization-register" element={<OrganizationRegister />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/ats-score" element={<ATSScorePage />} />
        <Route path="/voice-builder" element={<VoiceBuilder />} />
        <Route path="/resume-generator" element={<ResumeGenerator />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/organization-home" element={<OrganizationHome />} />
        <Route path="/organization-edit-profile" element={<OrganizationEditProfile />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;