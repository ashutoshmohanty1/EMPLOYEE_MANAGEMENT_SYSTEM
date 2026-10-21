import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardNavbar from "../../component/DashboardNavbar/DashboardNavbar";
import Sidebar from "../../component/Sidebar/Sidebar";

const Dashboard = () => {
    const navigate = useNavigate();

    const [now, setNow] = useState(new Date());
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Update current date and time
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
            } catch (error) {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login", { replace: true });
                } else {
                    console.error(
                        "Failed to fetch profile:",
                        error.response?.data || error.message
                    );
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const hour = now.getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 17
            ? "Good afternoon"
            : "Good evening";

    const todayDate = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const currentTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return (
        <div className="ems-layout bg-black text-white d-flex">
            {/* Desktop sidebar and mobile drawer */}
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

            <main
                className="ems-main flex-grow-1 p-2 p-sm-3 p-md-4"
            >
                <DashboardNavbar
                    user={user}
                    onMenuClick={() => setSidebarOpen((open) => !open)}
                />

                <div className="dashboard-content p-2 p-md-4 text-center">
                    {/* Welcome section */}
                    <h2 className="fw-bold dashboard-heading" style={{}}>
                        {greeting}, {user.name || "User"} 👋
                    </h2>

                    <p className="text-secondary">
                        Welcome back! Here's your personal workspace.
                    </p>

                    {/* Date and time */}
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-4">
                        <div className="text-secondary">
                            <i className="bi bi-calendar3 me-2"></i>
                            {todayDate}
                        </div>

                        <div className="text-white">
                            <i className="bi bi-clock me-2"></i>
                            {currentTime}
                        </div>
                    </div>
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

                .dashboard-heading {
                    font-size: 50px;
                    line-hight: 1.2
                    overflow-wrap: anywhere;
                }

                @media (max-width: 991.98px) {
                    .employee-sidebar {
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 1050;
                        transform: translateX(-100%);
                        transition: transform 0.25s ease;
                        visibility: hidden;
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
                }

                @media (max-width: 575.98px) {
                    .dashboard-content {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }

                    .dashboard-heading {
                        font-size: 26px;
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

export default Dashboard;
