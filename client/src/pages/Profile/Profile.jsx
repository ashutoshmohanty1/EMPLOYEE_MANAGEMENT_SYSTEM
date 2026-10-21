import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../component/Sidebar/Sidebar";
import DashboardNavbar from "../../component/DashboardNavbar/DashboardNavbar";

const Profile = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch logged-in employee profile
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const profile = response.data.user ?? response.data;

                setUser(profile);
                localStorage.setItem("user", JSON.stringify(profile));
            } catch (err) {
                if (
                    err.response?.status === 401 ||
                    err.response?.status === 403
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login", { replace: true });
                } else {
                    setError(
                        "Unable to load your profile. Please try again."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const displayName = user.name || "Employee";

    const displayRole = user.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
        : "Employee";

    const details = [
        {
            label: "Full Name",
            value: user.name || "Not available",
            icon: "bi-person",
            color: "#a78bfa"
        },
        {
            label: "Email Address",
            value: user.email || "Not available",
            icon: "bi-envelope",
            color: "#60a5fa"
        },
        {
            label: "Employee ID",
            value: user.id ?? "Not available",
            icon: "bi-person-badge",
            color: "#34d399"
        },
        {
            label: "Account Role",
            value: displayRole,
            icon: "bi-shield-check",
            color: "#fbbf24"
        }
    ];

    return (
        <div className="ems-layout bg-black text-white d-flex">
            {/* Responsive sidebar */}
            <div
                className={`employee-sidebar ${
                    sidebarOpen ? "employee-sidebar-open" : ""
                }`}
            >
                <Sidebar />
            </div>

            {/* Mobile backdrop */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop d-lg-none"
                    aria-label="Close navigation menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main
                className="ems-main flex-grow-1 p-2 p-sm-3 p-md-4"
            >
                <DashboardNavbar
                    user={user}
                    onMenuClick={() => setSidebarOpen((open) => !open)}
                />

                <div className="profile-content p-2 p-md-4">
                    {/* Page heading */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                        <div>
                            <h2 className="fw-bold profile-heading mb-1">
                                My Profile
                            </h2>

                            <p className="text-secondary mb-0">
                                Manage and view your account information.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-light rounded-3"
                            onClick={() => navigate("/dashboard")}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Dashboard
                        </button>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Loading state */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-light"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <p className="text-secondary mt-3 mb-0">
                                Loading your profile...
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Profile hero */}
                            <section
                                className="position-relative overflow-hidden rounded-4 border mb-4"
                                style={{
                                    background:
                                        "linear-gradient(120deg, #21113d 0%, #151027 55%, #0c101c 100%)",
                                    borderColor: "rgba(168,85,247,0.3)"
                                }}
                            >
                                <div
                                    className="profile-hero-content p-3 p-sm-4 p-md-5"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 90% 10%, rgba(168,85,247,0.22), transparent 45%)"
                                    }}
                                >
                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 gap-md-4">
                                        {/* Avatar */}
                                        <div
                                            className="rounded-circle d-flex justify-content-center align-items-center fw-bold flex-shrink-0"
                                            style={{
                                                width: "clamp(68px, 12vw, 100px)",
                                                height: "clamp(68px, 12vw, 100px)",
                                                fontSize: "clamp(28px, 5vw, 38px)",
                                                background:
                                                    "linear-gradient(135deg, #7c3aed, #c084fc)",
                                                border: "3px solid rgba(255,255,255,0.2)",
                                                boxShadow:
                                                    "0 10px 35px rgba(124,58,237,0.3)"
                                            }}
                                        >
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Employee details */}
                                        <div className="flex-grow-1 profile-hero-details">
                                            <span
                                                className="badge rounded-pill mb-2 px-3 py-2"
                                                style={{
                                                    background:
                                                        "rgba(74,222,128,0.12)",
                                                    color: "#4ade80",
                                                    border: "1px solid rgba(74,222,128,0.2)"
                                                }}
                                            >
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                Account Active
                                            </span>

                                            <h2 className="fw-bold profile-name mb-1">
                                                {displayName}
                                            </h2>

                                            <p className="text-white-50 mb-2 profile-email">
                                                {user.email ||
                                                    "Email not available"}
                                            </p>

                                            <span
                                                className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 small"
                                                style={{
                                                    background:
                                                        "rgba(168,85,247,0.16)",
                                                    color: "#d8b4fe"
                                                }}
                                            >
                                                <i className="bi bi-shield-lock"></i>
                                                {displayRole}
                                            </span>
                                        </div>

                                        {/* Employee ID */}
                                        <div className="profile-employee-id text-md-end">
                                            <small className="text-white-50 d-block mb-1">
                                                EMPLOYEE ID
                                            </small>

                                            <h5 className="fw-bold mb-0">
                                                #{user.id ?? "—"}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Personal information heading */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <i
                                    className="bi bi-person-vcard fs-5"
                                    style={{ color: "#a855f7" }}
                                ></i>

                                <h5 className="fw-bold mb-0">
                                    Personal Information
                                </h5>
                            </div>

                            {/* Information cards */}
                            <div className="row g-3 mb-4">
                                {details.map((item) => (
                                    <div
                                        className="col-12 col-md-6"
                                        key={item.label}
                                    >
                                        <div
                                            className="h-100 rounded-4 border p-3 p-sm-4"
                                            style={{
                                                background:
                                                    "linear-gradient(145deg, #11111b, #0b0b11)",
                                                borderColor:
                                                    "rgba(255,255,255,0.08)"
                                            }}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                        background: `${item.color}18`,
                                                        color: item.color
                                                    }}
                                                >
                                                    <i
                                                        className={`bi ${item.icon} fs-4`}
                                                    ></i>
                                                </div>

                                                <div
                                                    className="flex-grow-1"
                                                    style={{ minWidth: 0 }}
                                                >
                                                    <small className="text-secondary d-block mb-1">
                                                        {item.label}
                                                    </small>

                                                    <div
                                                        className="fw-semibold text-break"
                                                        style={{
                                                            overflowWrap:
                                                                "anywhere"
                                                        }}
                                                    >
                                                        {item.value}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Security panel */}
                            <section
                                className="rounded-4 border p-3 p-sm-4"
                                style={{
                                    background: "#101018",
                                    borderColor: "rgba(255,255,255,0.08)"
                                }}
                            >
                                <div className="d-flex align-items-start gap-3">
                                    <div
                                        className="rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            background:
                                                "rgba(74,222,128,0.12)",
                                            color: "#4ade80"
                                        }}
                                    >
                                        <i className="bi bi-shield-check fs-4"></i>
                                    </div>

                                    <div>
                                        <h6 className="fw-bold mb-1">
                                            Account Security
                                        </h6>

                                        <p className="text-secondary small mb-0">
                                            Your profile is loaded securely
                                            using your authenticated session.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </main>

            {/* Responsive styles */}
            <style>{`
                .ems-layout {
                    height: 100vh;
                    height: 100dvh;
                    width: 100%;
                    overflow: hidden;
                }

                .ems-layout > .employee-sidebar {
                    flex: 0 0 240px;
                    width: 240px;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    z-index: 1040;
                }

                .ems-layout > .employee-sidebar > .ems-sidebar {
                    width: 100%;
                    min-width: 0;
                    height: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                    box-sizing: border-box;
                }

                .ems-main {
                    min-width: 0;
                    height: 100%;
                    flex: 1 1 auto;
                    overflow-y: auto;
                    overflow-x: hidden;
                    scrollbar-width: thin;
                    scrollbar-color: #6b5b83 #111111;
                }

                .ems-main::-webkit-scrollbar {
                    width: 6px;
                }

                .ems-main::-webkit-scrollbar-thumb {
                    background: #6b5b83;
                    border-radius: 10px;
                }

                @media (max-width: 991.98px) {
                    .ems-layout > .employee-sidebar {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        height: 100vh;
                        height: 100dvh;
                        overflow: hidden;
                        transform: translateX(-100%);
                        visibility: hidden;
                        transition: transform 0.25s ease, visibility 0.25s ease;
                    }

                    .ems-layout > .employee-sidebar.employee-sidebar-open {
                        transform: translateX(0);
                        visibility: visible;
                    }
                }
                    
                .employee-sidebar {
                    flex-shrink: 0;
                    position: relative;
                    z-index: 1040;
                }

                .employee-sidebar aside {
                    width: 240px;
                    min-width: 240px;
                }

                .sidebar-backdrop {
                    display: none;
                }

                .profile-heading {
                    font-size: clamp(28px, 3vw, 40px);
                    overflow-wrap: anywhere;
                }

                .profile-name {
                    font-size: clamp(24px, 3vw, 34px);
                    overflow-wrap: anywhere;
                }

                .profile-email {
                    overflow-wrap: anywhere;
                }

                @media (max-width: 991.98px) {
                    .employee-sidebar {
                        position: fixed;
                        inset: 0 auto 0 0;
                        z-index: 1050;
                        transform: translateX(-100%);
                        visibility: hidden;
                        transition:
                            transform 0.25s ease,
                            visibility 0.25s ease;
                    }

                    .employee-sidebar.employee-sidebar-open {
                        transform: translateX(0);
                        visibility: visible;
                    }

                    .employee-sidebar aside {
                        height: 100vh;
                        overflow-y: auto;
                    }

                    .sidebar-backdrop {
                        display: block;
                        position: fixed;
                        inset: 0;
                        z-index: 1040;
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        border: 0;
                        background: rgba(0, 0, 0, 0.65);
                    }

                    .profile-employee-id {
                        text-align: left !important;
                    }
                }

                @media (max-width: 575.98px) {
                    .profile-content {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }

                    .profile-hero-content {
                        padding: 18px !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .employee-sidebar {
                        transition: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Profile;
