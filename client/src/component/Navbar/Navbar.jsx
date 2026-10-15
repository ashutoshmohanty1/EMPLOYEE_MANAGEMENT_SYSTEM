import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg position-relative z-3 px-3 px-lg-4 py-3">
            <div className="container-fluid">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand text-white fw-bold fs-3"
                >
                    EMS
                </Link>


                {/* Mobile Menu Button */}
                <button
                    className="navbar-toggler border border-secondary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="bi bi-list text-white"></span>
                </button>


                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <div className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

                        <Link
                            to="/login"
                            className="btn btn-outline-light px-4"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-light px-4"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            </div>
        </nav>
    );
}