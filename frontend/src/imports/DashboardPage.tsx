import { useNavigate } from "react-router";
import '../styles/Dashboard.css';

const DashboardPage = () => {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2
          className="logo"
          onClick={() => navigate("/")}
        >
          ATEION
        </h2>

        <ul>

          <li onClick={() => navigate("/")}>
            🏠 Home
          </li>

          <li onClick={() => navigate("/gco")}>
            🏆 Olympiad
          </li>

          <li onClick={() => navigate("/PlayGround")}>
            🎮 Playground
          </li>

          <li onClick={() => navigate("/certificate")}>
            ✅ Vouch
          </li>

          <li onClick={() => navigate("/assessment-demo")}>
            📊 Analytics
          </li>

          <li onClick={() => navigate("/contact")}>
            👤 Profile
          </li>

        </ul>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <div className="topbar">

          <h1>
            Welcome Back, Students 👋
          </h1>

          <p>
            Track your capability journey
          </p>

        </div>

        {/* CARDS */}
        <div className="cards">

          <div
            className="card"
            onClick={() => navigate("/gco")}
          >
            <h2>🏆 Olympiad</h2>
            <p>Participate in competitions</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/PlayGround")}
          >
            <h2>🎮 Playground</h2>
            <p>Solve interactive challenges</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/certificate")}
          >
            <h2>✅ Vouch</h2>
            <p>Earn certificates & badges</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/assessment-demo")}
          >
            <h2>📈 Leaderboard</h2>
            <p>Track your rankings</p>
          </div>

        </div>

      </main>

    </div>

  );
};

export default DashboardPage;