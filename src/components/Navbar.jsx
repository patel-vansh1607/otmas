import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogoClick = () => {
    if (!user) navigate("/");
    else if (user.role === "student") navigate("/student");
    else if (user.role === "tutor") navigate("/tutor");
    else if (user.role === "admin") navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

return (
    <nav>
        {/* --- White OTMAS Logo --- */}
        <h1
            onClick={handleLogoClick}
            style={{
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
                letterSpacing: "1px",
            }}
        >
            OTMAS
        </h1>

        <div className="nav-buttons">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="theme-toggle"
                title="Toggle theme"
            >
                {darkMode ? <Sun /> : <Moon />}
            </button>

            {!user ? (
                <button className="nav-btn" onClick={() => navigate("/login")}>
                    Login
                </button>
            ) : (
                <button onClick={handleLogout} className="nav-btn">
                    Logout
                </button>
            )}
        </div>
    </nav>
);
}
