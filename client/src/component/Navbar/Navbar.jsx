import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg position-relative z-3 px-4 py-3">
            <div className="container-fluid">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand text-white fw-bold fs-3"
                >
                    EMS
                </Link>

                {/* Right Side */}
                <div className="d-flex gap-2">

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
        </nav>
    );
}