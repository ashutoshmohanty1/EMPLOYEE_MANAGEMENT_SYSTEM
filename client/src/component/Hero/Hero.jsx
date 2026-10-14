import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="position-relative z-2 min-vh-100 d-flex align-items-center">
            <div className="container">

                <div className="row">
                    <div className="col-lg-7">

                        <p className="text-uppercase fw-semibold mb-3 text-white">
                            Welcome to Employee Management System
                        </p>

                        <h1 className="display-1 fw-bold text-white">
                            Manage
                            <br />
                            Your Employees.
                        </h1>

                        <p className="lead text-white-50 mt-4">
                            A simple and powerful employee management system
                            to manage your employees, tasks, attendance,
                            and everything in one place.
                        </p>

                        <div className="d-flex gap-3 mt-4">

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