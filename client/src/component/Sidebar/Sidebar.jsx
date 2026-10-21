import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const menuItems = [
        {
            name: "Dashboard",
            icon: "bi-grid-1x2-fill",
            path: "/dashboard"
        },
        {
            name: "Employees",
            icon: "bi-people-fill",
            path: "/employees"
        },
        {
            name: "Departments",
            icon: "bi-building-fill",
            path: "/departments"
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

    return (
        <aside className="bg-black text-white min-vh-100 border-end border-secondary-subtle p-3">
            {/* Logo */}
            <div className="d-flex align-items-center gap-3 px-2 py-3 mb-4">
                <div
                    className="d-flex justify-content-center align-items-center rounded-3"
                    style={{
                        width: "42px",
                        height: "42px",
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)"
                    }}
                >
                    <i className="bi bi-buildings-fill fs-5"></i>
                </div>

                <div>
                    <h5 className="mb-0 fw-bold">Employee</h5>
                    <small className="text-secondary">Management System</small>
                </div>
            </div>

            {/* Main Menu */}
            <div className="mb-3">
                <small className="text-secondary text-uppercase fw-semibold px-2">
                    Main Menu
                </small>
            </div>

            <nav className="d-flex flex-column gap-2">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `text-decoration-none rounded-3 px-3 py-3 d-flex align-items-center gap-3 ${
                                isActive
                                    ? "text-white"
                                    : "text-secondary"
                            }`
                        }
                        style={({ isActive }) => ({
                            background: isActive
                                ? "linear-gradient(90deg, rgba(124,58,237,0.35), rgba(124,58,237,0.08))"
                                : "transparent",
                            border: isActive
                                ? "1px solid rgba(168,85,247,0.25)"
                                : "1px solid transparent"
                        })}
                    >
                        {({ isActive }) => (
                            <>
                                <i
                                    className={`bi ${item.icon} ${
                                        isActive ? "text-violet" : ""
                                    }`}
                                    style={{
                                        color: isActive ? "#a855f7" : ""
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

            {/* Bottom Section */}
            <div className="mt-5">

                <div className="mb-3">
                    <small className="text-secondary text-uppercase fw-semibold px-2">
                        System
                    </small>
                </div>

                <NavLink
                    to="/settings"
                    className="text-decoration-none text-secondary rounded-3 px-3 py-3 d-flex align-items-center gap-3"
                >
                    <i className="bi bi-gear-fill"></i>
                    <span className="fw-medium">Settings</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;