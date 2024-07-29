import { Link } from 'react-router-dom';

function WageVerification() {
  return (
    <div>
      <h1>Wage Verification</h1>
      <nav>
        <ul>
          <li>
            <Link to="/wage-verification-detail">급여확인 상세페이지</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default WageVerification;
