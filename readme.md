# Resume Building Website - Directory Structure

## Frontend (frontend/)

```
frontend/
├── index.html
├── package.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── assets/
│   │   └── images/
│   ├── components/
│   ├── contexts/
│   │   └── LanguageContext.jsx
│   ├── pages/
│   │   ├── guest-user/
│   │   │   ├── ats-score/
│   │   │   └── templates/
│   │   ├── landing/
│   │   ├── language-selection/
│   │   ├── tutorial/
│   │   ├── role-selection/
│   │   │   └── RoleSelection.jsx
│   │   ├── user-auth/
│   │   │   ├── login/
│   │   │   │   ├── UserLogin.jsx
│   │   │   │   └── UserLogin.css
│   │   │   └── register/
│   │   │       ├── UserRegister.jsx
│   │   │       └── UserRegister.css
│   │   ├── organization-auth/
│   │   │   ├── login/
│   │   │   │   ├── OrganizationLogin.jsx
│   │   │   │   └── OrganizationLogin.css
│   │   │   └── register/
│   │   │       ├── OrganizationRegister.jsx
│   │   │       └── OrganizationRegister.css
│   │   ├── user-home/
│   │   │   ├── ats-score/
│   │   │   ├── jobs/
│   │   │   ├── profile/
│   │   │   ├── resume-generator/
│   │   │   ├── templates/
│   │   │   └── voice-builder/
│   │   └── organization-home/
│   │       ├── dashboard/
│   │       ├── payment/
│   │       └── profile/
│   ├── styles/
│   │   └── index.css
│   └── utils/
└── ...
```

### Frontend pages and functionality

- **Landing**: First touchpoint with branding and CTAs to start. Typically routes users toward language selection or role selection.
- **Language Selection**: Lets users pick a preferred language. Selection is provided through `LanguageContext` for use across the app.
- **Tutorial**: Lightweight onboarding that welcomes users and offers navigation back to start or onward to auth.
- **Role Selection**: Toggle between User and Organization roles, then proceed to Login or Sign Up for the chosen role.

- **User Auth**
  - **Login (Individual)**: Phone number + password form. Includes show/hide password and forgot password link. Navigates to `/user-home` on submit.
  - **Register (Individual)**: Collects full name, phone number, password/confirm, and gender (selectable cards). Navigates to `/user-home` on submit.

- **Organization Auth**
  - **Login (Organization)**: Organization email + password form. Includes show/hide password. Navigates to `/organization-home` on submit.
  - **Register (Organization)**: Collects full name, organization name, organization email/confirm, organization phone/confirm, password/confirm, and gender. Navigates to `/organization-home` on submit.

- **Guest User**
  - **Templates**: Browse sample resume templates without logging in.
  - **ATS Score**: UI to check ATS score from a resume without authentication.

- **User Home**
  - **Templates**: Explore and select templates for resume building.
  - **ATS Score**: Run ATS evaluation for the logged-in user.
  - **Resume Generator**: Build and generate resumes using structured inputs and selected templates.
  - **Voice-resume Builder**: Create or manage resume extracting key features from voice and generating resume from it. and saving it to the  profile edit the generated resume and exporting it .
  - **Profile**: View and edit user profile details.
  - **Jobs**: Browse or manage job listings (placeholder/feature-ready folder).

- **Organization Home**
  - **Dashboard**: Overview for organizational activities and quick stats.
  - **Payment History**: View payments and transactions related to organization usage for premium pages .
  - **Profile**: Edit organization profile information.

## Backend (backend/)

```
backend/
├── package.json
├── server.js              # Express app entry
├── config/
│   └── db.js              # Database connection
├── controllers/           # Route handlers (if any)
├── middlewares/           # Custom middleware (if any)
├── models/
│   ├── User.js
│   └── Organization.js
└── routes/                # API route definitions (if any)
```

## Notes
- Frontend uses React with React Router; global styles live in `src/styles/index.css`.
- Auth flows are split for Individuals and Organizations under `pages/*-auth/`.
- The backend is an Express server with Mongo models for `User` and `Organization`.
