import { useNavigate, useLocation } from "react-router-dom";

const DashboardNavbar = ({ user = {}, onMenuClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const name = user.name || "User";

    const role = user.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
        : "Employee";

    // Show the current page title
    const pageTitles = {
        "/dashboard": "Dashboard",
        "/profile": "My Profile",
        "/tasks": "My Tasks",
        "/attendance": "Attendance",
        "/leave": "Leave",
        "/settings": "Settings"
    };

    const pageTitle = pageTitles[location.pathname] || "Employee Portal";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <header className="border-bottom border-secondary-subtle px-2 px-sm-3 px-md-4 py-3">
            <div className="d-flex justify-content-between align-items-center gap-2">

                {/* Left section */}
                <div className="d-flex align-items-center gap-2">

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="btn text-white d-lg-none p-2"
                        onClick={onMenuClick}
                        aria-label="Toggle navigation menu"
                        title="Open navigation"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>

                    {/* Page title */}
                    <div>
                        <h4 className="mb-1 fw-bold">
                            {pageTitle}
                        </h4>

                        <small className="text-secondary d-none d-sm-block">
                            Your employee workspace
                        </small>
                    </div>
                </div>

                {/* Right section */}
                <div className="d-flex align-items-center gap-2 gap-md-3">

                    {/* Notifications */}
                    <button
                        className="btn text-white p-2"
                        type="button"
                        aria-label="Notifications"
                        title="Notifications"
                    >
                        <i className="bi bi-bell fs-5"></i>
                    </button>

                    {/* Employee avatar */}
                    <div
                        className="rounded-circle d-flex justify-content-center align-items-center fw-bold flex-shrink-0"
                        style={{
                            width: "38px",
                            height: "38px",
                            background:
                                "linear-gradient(135deg, #7c3aed, #a855f7)"
                        }}
                        title={name}
                    >
                        {name.charAt(0).toUpperCase()}
                    </div>

                    {/* Employee name and role */}
                    <div className="d-none d-md-block">
                        <div className="fw-semibold">{name}</div>
                        <small className="text-secondary">{role}</small>
                    </div>

                    {/* Logout */}
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm flex-shrink-0"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <i className="bi bi-box-arrow-right me-sm-1"></i>
                        <span className="d-none d-sm-inline">Logout</span>
                    </button>

                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
