import "../styles/login.css";

export default function LoginPage({ closeLogin }: any) {

  // SIGN IN
  const handleLogin = () => {

    const email =
      (
        document.querySelector(
          'input[placeholder="Email Address"]'
        ) as HTMLInputElement
      ).value;

    const password =
      (
        document.querySelector(
          'input[placeholder="Password"]'
        ) as HTMLInputElement
      ).value;

    // VALIDATION

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // SUCCESS

    alert("Login Successful 🚀");

    closeLogin();
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.open(
      "https://accounts.google.com/",
      "_blank"
    );
  };

  // LINKEDIN LOGIN
  const handleLinkedinLogin = () => {
    window.open(
      "https://linkedin.com/login",
      "_blank"
    );
  };

  // GITHUB LOGIN
  const handleGithubLogin = () => {
    window.open(
      "https://github.com/login",
      "_blank"
    );
  };

  return (

    <div className="login-container">

      <div className="login-card">

        {/* CLOSE BUTTON */}

        <button
          className="close-btn"
          onClick={closeLogin}
        >
          ✕
        </button>

        {/* LEFT SIDE */}

        <div className="left-side">

          <h1>
            Welcome
            <br />
            Back
          </h1>

          <p>
            Sign in and continue your journey
            with Ateion modern learning.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="right-side">

          <h2>Sign In</h2>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          {/* SIGN IN BUTTON */}

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Sign In
          </button>

          {/* DIVIDER */}

          <div className="divider">
            OR CONTINUE WITH
          </div>

          {/* GOOGLE */}

          <button
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          {/* LINKEDIN */}

          <button
            className="linkedin-btn"
            onClick={handleLinkedinLogin}
          >
            Continue with LinkedIn
          </button>

          {/* GITHUB */}

          <button
            className="github-btn"
            onClick={handleGithubLogin}
          >
            Continue with GitHub
          </button>

        </div>

      </div>

    </div>
  );
}