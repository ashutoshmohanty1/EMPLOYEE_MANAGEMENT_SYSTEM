import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../component/Sidebar/Sidebar";
import DashboardNavbar from "../../component/DashboardNavbar/DashboardNavbar";
import MyTasks from "../../component/MyTasks/MyTasks";

const Tasks = () => {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

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
                        "Failed to load profile:",
                        error.response?.data || error.message
                    );
                }
            }
        };

        fetchProfile();
    }, [navigate]);

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

                <div className="tasks-page-content p-2 p-md-4">
                    {/* Page heading */}
                    <div className="mb-4">
                        <h2 className="fw-bold tasks-page-heading mb-2">
                            My Tasks
                        </h2>

                        <p className="text-secondary mb-0">
                            View your tasks, track progress, and manage
                            deadlines.
                        </p>
                    </div>

                    {/* Existing task component */}
                    <MyTasks />
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

                .tasks-page-heading {
                    font-size: clamp(28px, 3vw, 40px);
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
                }

                @media (max-width: 575.98px) {
                    .tasks-page-content {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
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

export default Tasks;
