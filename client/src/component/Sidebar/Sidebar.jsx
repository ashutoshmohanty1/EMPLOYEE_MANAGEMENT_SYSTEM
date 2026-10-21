import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const menuItems = [
        {
            name: "Dashboard",
            icon: "bi-grid-1x2-fill",
            path: "/dashboard",
            end: true
        },
        {
            name: "My Profile",
            icon: "bi-person-circle",
            path: "/profile"
        },
        {
            name: "My Tasks",
            icon: "bi-list-check",
            path: "/tasks"
        },
        {
            name: "Attendance",
            icon: "bi-calendar-check-fill",
            path: "/attendance"
        },
        {
            name: "Leave",
            icon: "bi-calendar2-minus-fill",
            path: "/leave"
        }
    ];

    const linkClass = ({ isActive }) =>
        `text-decoration-none rounded-3 px-3 py-3 d-flex align-items-center gap-3 ${
            isActive ? "text-white" : "text-secondary"
        }`;

    const linkStyle = ({ isActive }) => ({
        background: isActive
            ? "linear-gradient(90deg, rgba(124,58,237,0.35), rgba(124,58,237,0.08))"
            : "transparent",
        border: isActive
            ? "1px solid rgba(168,85,247,0.25)"
            : "1px solid transparent"
    });

    return (
        <>
            <aside className="ems-sidebar bg-black text-white border-end border-secondary-subtle p-3">
                {/* Logo */}
                <div className="d-flex align-items-center gap-3 px-2 py-3 mb-4">
                    <div
                        className="d-flex justify-content-center align-items-center rounded-3 flex-shrink-0"
                        style={{
                            width: "42px",
                            height: "42px",
                            background:
                                "linear-gradient(135deg, #7c3aed, #a855f7)"
                        }}
                    >
                        <i className="bi bi-buildings-fill fs-5"></i>
                    </div>

                    <div>
                        <h5 className="mb-0 fw-bold">Employee</h5>
                        <small className="text-secondary">
                            Management System
                        </small>
                    </div>
                </div>

                {/* Employee menu */}
                <div className="mb-3">
                    <small className="text-secondary text-uppercase fw-semibold px-2">
                        Employee Menu
                    </small>
                </div>

                <nav className="d-flex flex-column gap-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={linkClass}
                            style={linkStyle}
                        >
                            {({ isActive }) => (
                                <>
                                    <i
                                        className={`bi ${item.icon}`}
                                        style={{
                                            color: isActive
                                                ? "#a855f7"
                                                : "inherit",
                                            fontSize: "1.1rem"
                                        }}
                                    ></i>

                                    <span className="fw-medium">
                                        {item.name}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* System menu */}
                <div className="mt-5">
                    <div className="mb-3">
                        <small className="text-secondary text-uppercase fw-semibold px-2">
                            System
                        </small>
                    </div>

                    <NavLink
                        to="/settings"
                        end
                        className={linkClass}
                        style={linkStyle}
                    >
                        <i className="bi bi-gear-fill"></i>
                        <span className="fw-medium">Settings</span>
                    </NavLink>
                </div>
            </aside>

            {/* Sidebar scrollbar styles */}
            <style>{`
                .ems-sidebar {
                    width: 240px;
                    min-width: 240px;
                    height: 100vh;
                    height: 100dvh;
                    box-sizing: border-box;
                    overflow-y: auto;
                    overflow-x: hidden;
                    scrollbar-width: thin;
                    scrollbar-color: #6b5b83 #111111;
                }

                .ems-sidebar::-webkit-scrollbar {
                    width: 5px;
                }

                .ems-sidebar::-webkit-scrollbar-track {
                    background: #111111;
                }

                .ems-sidebar::-webkit-scrollbar-thumb {
                    background: #6b5b83;
                    border-radius: 10px;
                }

                .ems-sidebar::-webkit-scrollbar-thumb:hover {
                    background: #a855f7;
                }

                .ems-sidebar nav a {
                    flex-shrink: 0;
                }

                @media (max-width: 991.98px) {
                    .ems-sidebar {
                        height: 100vh;
                        height: 100dvh;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ems-sidebar {
                        scroll-behavior: auto;
                    }
                }
            `}</style>
        </>
    );
};

export default Sidebar;
