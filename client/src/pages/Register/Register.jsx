export default function Register() {
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
                    <h1 className="fw-bold">Create Account</h1>

                    <p className="text-white-50">
                        Create your account to get started
                    </p>
                </div>

                <form>

                    {/* Name */}
                    <div className="mb-3">
                        <label
                            htmlFor="name"
                            className="form-label"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>

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
                            placeholder="Create a password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="form-label"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="btn btn-light btn-lg w-100 fw-bold"
                    >
                        Create Account
                    </button>

                    {/* Login */}
                    <p className="text-center mt-4 mb-0 text-white-50">
                        Already have an account?{" "}

                        <a
                            href="/"
                            className="text-white fw-bold text-decoration-none"
                        >
                            Login
                        </a>
                    </p>

                </form>

            </div>
        </div>
    );
}