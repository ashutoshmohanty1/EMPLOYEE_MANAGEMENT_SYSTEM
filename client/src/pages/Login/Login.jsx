export default function Login() {
    return (
        <div
            className="min-vh-100 w-100 d-flex justify-content-center align-items-center text-white p-3"
            style={{
                background: "linear-gradient(135deg, #000000, #6a11cb)"
            }}
        >
            <div
                className="bg-white bg-opacity-10 border border-secondary rounded-4 p-4 p-md-5 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    backdropFilter: "blur(10px)"
                }}
            >
                {/* Heading */}
                <div className="text-center mb-4">
                    <h1 className="fw-bold">Welcome Back</h1>
                    <p className="text-white-50">
                        Login to your account
                    </p>
                </div>

                <form>

                    {/* Email */}
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="itishree@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Remember + Forgot */}
                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember"
                            />

                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>
                        </div>

                        <a
                            href="#"
                            className="text-white text-decoration-none"
                        >
                            Forgot password?
                        </a>

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="btn btn-light btn-lg w-100 fw-bold"
                    >
                        Login
                    </button>

                    {/* Register */}
                    <p className="text-center mt-4 mb-0 text-white-50">
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="text-white fw-bold text-decoration-none"
                        >
                            Register
                        </a>
                    </p>

                </form>
            </div>
        </div>
    )
}