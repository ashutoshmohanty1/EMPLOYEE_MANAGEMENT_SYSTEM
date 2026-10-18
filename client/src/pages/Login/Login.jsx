import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            localStorage.setItem("token", response.data.token);

            alert("login Successful");

            navigate("/");
        } catch(error) {
            console.error("Login Error: ", error);

            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Unable to connect to server");
            }
        }
    };

    return (
        <div
            className="min-vh-100 position-relative d-flex align-items-center justify-content-center overflow-hidden p-3"
            style={{
                background:
                    "linear-gradient(135deg, #050505 0%, #10051c 50%, #1a0830 100%)"
            }}
        >

            {/* Purple Glow - Left */}
            <div
                className="position-absolute"
                style={{
                    width: "450px",
                    height: "450px",
                    top: "-180px",
                    left: "-180px",
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.45), transparent 70%)",
                    filter: "blur(50px)",
                    pointerEvents: "none"
                }}
            ></div>


            {/* Purple Glow - Right */}
            <div
                className="position-absolute"
                style={{
                    width: "500px",
                    height: "500px",
                    bottom: "-220px",
                    right: "-200px",
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
                    filter: "blur(50px)",
                    pointerEvents: "none"
                }}
            ></div>


            {/* Login Card */}
            <div
                className="position-relative w-100 text-white rounded-4 p-4 p-sm-5"
                style={{
                    maxWidth: "430px",
                    background: "rgba(15, 10, 25, 0.72)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.45)"
                }}
            >

                {/* Back to Home */}
                <Link
                    to="/"
                    className="d-inline-flex align-items-center gap-2 text-white-50 text-decoration-none mb-4"
                >
                    <i className="bi bi-arrow-left"></i>
                    <span>Back to Home</span>
                </Link>


                {/* Logo */}
                <div className="text-center mb-4">

                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                        style={{
                            width: "55px",
                            height: "55px",
                            background:
                                "linear-gradient(135deg, #6a11cb, #a855f7)",
                            boxShadow:
                                "0 10px 30px rgba(124,58,237,0.35)"
                        }}
                    >
                        <i className="bi bi-people-fill fs-4"></i>
                    </div>

                    <h2 className="fw-bold mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-white-50 mb-0">
                        Login to your Employee Management System
                    </p>

                </div>


                {/* Form */}
                <form onSubmit={handleLogin}>

                    {/* Email */}
                    <div className="mb-3">

                        <label
                            htmlFor="email"
                            className="form-label fw-semibold"
                        >
                            Email
                        </label>

                        <div className="input-group">

                            <span
                                className="input-group-text text-white-50"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            >
                                <i className="bi bi-envelope"></i>
                            </span>

                            <input
                                id="email"
                                type="email"
                                className="form-control form-control-lg text-white"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div className="mb-3">

                        <label
                            htmlFor="password"
                            className="form-label fw-semibold"
                        >
                            Password
                        </label>

                        <div className="input-group">

                            <span
                                className="input-group-text text-white-50"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            >
                                <i className="bi bi-lock"></i>
                            </span>

                            <input
                                id="password"
                                type="password"
                                className="form-control form-control-lg text-white"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                        </div>

                    </div>


                    {/* Remember + Forgot */}
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4">

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember"
                            />

                            <label
                                className="form-check-label text-white-50"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>

                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-white-50 text-decoration-none small"
                        >
                            Forgot password?
                        </Link>

                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="btn btn-light btn-lg w-100 fw-bold"
                    >
                        Login
                    </button>

                </form>


                {/* Register */}
                <div
                    className="text-center mt-4 pt-4"
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.10)"
                    }}
                >

                    <p className="text-white-50 mb-0">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-white fw-semibold text-decoration-none"
                        >
                            Create account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}