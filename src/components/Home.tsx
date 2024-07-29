import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/personal-work-schedule">개인근무일정표</Link>
          </li>
          <li>
            <Link to="/wage-verification">급여확인</Link>
          </li>
          <li>
            <Link to="/my-profile">내프로필</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
