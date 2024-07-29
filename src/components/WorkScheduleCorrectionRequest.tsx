import { Link } from 'react-router-dom';

function WorkScheduleCorrectionRequest() {
  return (
    <div>
      <h1>Work Schedule Correction Request</h1>
      <nav>
        <ul>
          <li>
            <Link to="/work-schedule-correction-request-detail">
              근무정정신청 상세페이지
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default WorkScheduleCorrectionRequest;
