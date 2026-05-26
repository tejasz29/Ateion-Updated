import "../styles/register.css";

export default function RegisterPage({ closeRegister }: any) {

  // CREATE ACCOUNT
  const handleCreateAccount = () => {

    const fullName =
      (
        document.querySelector(
          'input[placeholder="Full Name"]'
        ) as HTMLInputElement
      ).value;

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

    const confirmPassword =
      (
        document.querySelector(
          'input[placeholder="Confirm Password"]'
        ) as HTMLInputElement
      ).value;

    // VALIDATION

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // SUCCESS

    alert("Account Created Successfully 🚀");

    closeRegister();
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

    <div className="register-container">

      <div className="register-card">

        {/* CLOSE BUTTON */}

        <button
          className="close-btn"
          onClick={closeRegister}
        >
          ✕
        </button>

        {/* LEFT SIDE */}

        <div className="left-side">

          <h1>
            Join Ateion
          </h1>

          <p>
            Reimagining education with innovation,
            workshops and modern learning.
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="right-side">

          <h2>Create Account</h2>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          {/* CREATE ACCOUNT BUTTON */}

          <button
            className="register-btn"
            onClick={handleCreateAccount}
          >
            Create Account
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