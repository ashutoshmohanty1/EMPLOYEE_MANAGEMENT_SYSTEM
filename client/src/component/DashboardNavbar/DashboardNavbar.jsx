
import React from "react";

const DashboardNavbar = ({ user = {} }) => {
    const name = user.name || "User";

    const role = user.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
        : "Employee";

    return (
        <header className="border-bottom border-secondary-subtle px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">

                {/* Left */}
                <div>
                    <h4 className="mb-1 fw-bold">
                        Dashboard
                    </h4>

                    <small className="text-secondary">
                        Overview of your employee management system
                    </small>
                </div>

                {/* Right */}
                <div className="d-flex align-items-center gap-4">

                    {/* Notification */}
                    <button
                        className="btn text-white position-relative p-2"
                        type="button"
                        aria-label="Notifications"
                    >
                        <i className="bi bi-bell fs-5"></i>
                    </button>

                    {/* Divider */}
                    <div
                        className="vr bg-secondary"
                        style={{ height: "35px" }}
                    ></div>

                    {/* User */}
                    <div className="d-flex align-items-center gap-3">
                        <div
                            className="rounded-circle d-flex justify-content-center align-items-center fw-bold"
                            style={{
                                width: "42px",
                                height: "42px",
                                background:
                                    "linear-gradient(135deg, #7c3aed, #a855f7)"
                            }}
                        >
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div className="d-none d-md-block">
                            <div className="fw-semibold">
                                {name}
                            </div>

                            <small className="text-secondary">
                                {role}
                            </small>
                        </div>

                        <i className="bi bi-chevron-down text-secondary"></i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
