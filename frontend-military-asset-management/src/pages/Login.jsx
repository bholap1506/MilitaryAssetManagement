import { useState } from "react"
import {useNavigate} from "react-router-dom";

import api from "../api";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const response = await api.post("api/auth/login", {
                username,
                password
            })

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);
            
            navigate("/dashboard");

        }
        catch (error) {

            setError("Invalid Username or Password")
        }
    }

    return (

    <div className="login-page">

      <div className="login-card">

        <h1>Military Asset Management</h1>

        <p className="login-subtitle">
          Secure Logistics Management System
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login