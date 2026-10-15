import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="position-relative text-white overflow-hidden"
            style={{
                background: "rgba(5, 3, 10, 0.92)",
                borderTop: "1px solid rgba(255,255,255,0.10)"
            }}
        >

            <div className="container py-5">

                <div className="row g-5">

                    {/* Brand */}
                    <div className="col-12 col-lg-5">

                        <h3 className="fw-bold">
                            EMS
                        </h3>

                        <p
                            className="text-white-50 mt-3 mb-0"
                            style={{
                                maxWidth: "400px"
                            }}
                        >
                            Employee Management System designed to
                            simplify employee management, attendance
                            and daily tasks in one place.
                        </p>

                    </div>


                    {/* Quick Links */}
                    <div className="col-6 col-lg-3">

                        <h5 className="fw-semibold">
                            Quick Links
                        </h5>

                        <div className="d-flex flex-column gap-2 mt-3">

                            <Link
                                to="/"
                                className="text-white-50 text-decoration-none"
                            >
                                Home
                            </Link>

                            <Link
                                to="/login"
                                className="text-white-50 text-decoration-none"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-white-50 text-decoration-none"
                            >
                                Register
                            </Link>

                        </div>

                    </div>


                    {/* Features */}
                    <div className="col-6 col-lg-3">

                        <h5 className="fw-semibold">
                            Features
                        </h5>

                        <div className="d-flex flex-column gap-2 mt-3">

                            <span className="text-white-50">
                                Employee Management
                            </span>

                            <span className="text-white-50">
                                Attendance Tracking
                            </span>

                            <span className="text-white-50">
                                Task Management
                            </span>

                            <span className="text-white-50">
                                Secure Access
                            </span>

                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div
                    className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start gap-2 mt-5 pt-4"
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.10)"
                    }}
                >

                    <p className="text-white-50 mb-0">
                        © 2026 Employee Management System.
                    </p>

                    <p className="text-white-50 mb-0">
                        Built with React & Bootstrap
                    </p>

                </div>

            </div>

        </footer>
    );
}