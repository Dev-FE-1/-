// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PersonalWorkSchedule from './components/PersonalWorkSchedule';
import PersonalWorkScheduleDetail from './components/PersonalWorkScheduleDetail';
import WageVerification from './components/WageVerification';
import WageVerificationDetail from './components/WageVerificationDetail';
import WorkScheduleCorrectionRequest from './components/WorkScheduleCorrectionRequest';
import WorkScheduleCorrectionRequestDetail from './components/WorkScheduleCorrectionRequestDetail';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/personal-work-schedule"
          element={<PersonalWorkSchedule />}
        />
        <Route
          path="/personal-work-schedule-detail"
          element={<PersonalWorkScheduleDetail />}
        />
        <Route path="/wage-verification" element={<WageVerification />} />
        <Route
          path="/wage-verification-detail"
          element={<WageVerificationDetail />}
        />
        <Route
          path="/work-schedule-correction-request"
          element={<WorkScheduleCorrectionRequest />}
        />
        <Route
          path="/work-schedule-correction-request-detail"
          element={<WorkScheduleCorrectionRequestDetail />}
        />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
