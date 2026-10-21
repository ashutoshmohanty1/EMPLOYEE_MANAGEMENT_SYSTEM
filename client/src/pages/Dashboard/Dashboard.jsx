import { useState, useEffect } from "react";
import DashboardNavbar from "../../component/DashboardNavbar/DashboardNavbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import StatCard from "../../component/StatCard/StatCard";
import RecentEmployees from "../../component/RecentEmployees/RecentEmployees";
import MyTasks from "../../component/MyTasks/MyTasks";

const Dashboard = () => {
    let user = {};

    const [now, setNow] = useState(new Date());

    try {
        user = JSON.parse(localStorage.getItem("user")) || {};
    } catch {
        user = {};
    }

    const hour = now.getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 17
            ? "Good afternoon"
            : "Good evening";

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const todayDate = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const currentTime = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    return (
        <div className="bg-black min-vh-100 text-white d-flex">
            <Sidebar />
            <main className="flex-grow-1 p-4">
                <DashboardNavbar user={user} />
                <div className="p-4">
                    <h2 className="fw-bold">
                        {greeting}, {user.name || "User"} 👋
                    </h2>

                    <p className="text-secondary">
                        Welcome back! Here's what's happening today.
                    </p>

                    <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                        <div className="text-secondary">
                            <i className="bi bi-calendar3 me-2"></i>
                            {todayDate}
                        </div>

                        <div className="text-white">
                            <i className="bi bi-clock me-2"></i>
                            {currentTime}
                        </div>
                    </div>

                    <MyTasks />

                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-xl-3">
                            <StatCard title="Total Employees" value="120" icon="bi-people-fill" change="+12%" changeText="this month" positive={true} />
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <StatCard title="Active Employees" value="95" icon="bi-person-check-fill" change="+8%" changeText="this month" positive={true} />
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <StatCard title="On Leave" value="7" icon="bi-calendar2-minus-fill" change="-2%" changeText="this month" positive={true} />
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <StatCard title="Departments" value="8" icon="bi-building-fill" change="+1" changeText="new department" positive={true} />
                        </div>
                    </div>

                    <RecentEmployees />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
