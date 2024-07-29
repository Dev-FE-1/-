import { Link } from 'react-router-dom';

function PersonalWorkSchedule() {
  return (
    <div>
      <h1>Personal Work Schedule</h1>
      <nav>
        <ul>
          <li>
            <Link to="/personal-work-schedule-detail">
              개인근무일정표 상세페이지
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PersonalWorkSchedule;
