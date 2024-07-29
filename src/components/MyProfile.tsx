import { Link } from 'react-router-dom';

function MyProfile() {
  return (
    <div>
      <h1>My Profile</h1>
      <nav>
        <ul>
          <li>
            <Link to="/work-schedule-correction-request">근무정정신청</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MyProfile;
