import { Link } from "react-router-dom";

export default function Register() {
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


            {/* Register Card */}
            <div
                className="position-relative w-100 text-white rounded-4 p-4 p-sm-5"
                style={{
                    maxWidth: "500px",
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


                {/* Header */}
                <div className="text-center mb-4">

                    {/* Logo */}
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
                        Create Account
                    </h2>

                    <p className="text-white-50 mb-0">
                        Create your Employee Management System account
                    </p>

                </div>


                {/* Form */}
                <form>

                    {/* Full Name */}
                    <div className="mb-3">

                        <label
                            htmlFor="name"
                            className="form-label fw-semibold"
                        >
                            Full Name
                        </label>

                        <div className="input-group">

                            <span
                                className="input-group-text text-white-50"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            >
                                <i className="bi bi-person"></i>
                            </span>

                            <input
                                id="name"
                                type="text"
                                className="form-control form-control-lg text-white"
                                placeholder="Enter your full name"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                        </div>

                    </div>


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
                                placeholder="Create a password"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                        </div>

                    </div>


                    {/* Confirm Password */}
                    <div className="mb-4">

                        <label
                            htmlFor="confirmPassword"
                            className="form-label fw-semibold"
                        >
                            Confirm Password
                        </label>

                        <div className="input-group">

                            <span
                                className="input-group-text text-white-50"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            >
                                <i className="bi bi-lock-fill"></i>
                            </span>

                            <input
                                id="confirmPassword"
                                type="password"
                                className="form-control form-control-lg text-white"
                                placeholder="Confirm your password"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    borderColor: "rgba(255,255,255,0.15)"
                                }}
                            />

                        </div>

                    </div>


                    {/* Register Button */}
                    <button
                        type="submit"
                        className="btn btn-light btn-lg w-100 fw-bold"
                    >
                        Create Account
                    </button>

                </form>


                {/* Login */}
                <div
                    className="text-center mt-4 pt-4"
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.10)"
                    }}
                >

                    <p className="text-white-50 mb-0">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-white fw-semibold text-decoration-none"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}