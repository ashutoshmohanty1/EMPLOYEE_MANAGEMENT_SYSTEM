import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="position-relative z-2 min-vh-100 d-flex align-items-center">
            <div className="container">

                <div className="row">
                    <div className="col-12 col-lg-7">

                        <p className="text-uppercase fw-semibold mb-3 text-white">
                            Welcome to Employee Management System
                        </p>

                        <h1
                            className="fw-bold text-white"
                            style={{
                                fontSize: "clamp(3rem, 8vw, 7rem)",
                                lineHeight: "0.95"
                            }}
                        >
                            Manage
                            <br />
                            Your Employees.
                        </h1>

                        <p
                            className="lead text-white-50 mt-4"
                            style={{ maxWidth: "650px" }}
                        >
                            A simple and powerful employee management system
                            to manage your employees, tasks, attendance,
                            and everything in one place.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 mt-4">

                            <Link
                                to="/register"
                                className="btn btn-light btn-lg px-4"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="btn btn-outline-light btn-lg px-4"
                            >
                                Login
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}