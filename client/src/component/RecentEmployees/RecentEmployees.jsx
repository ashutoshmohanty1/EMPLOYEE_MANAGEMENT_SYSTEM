import React from "react";

const RecentEmployees = () => {
    const employees = [
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            department: "Development",
            position: "Frontend Developer",
            status: "Active"
        },
        {
            id: 2,
            name: "Priya Das",
            email: "priya@gmail.com",
            department: "HR",
            position: "HR Manager",
            status: "Active"
        },
        {
            id: 3,
            name: "Amit Kumar",
            email: "amit@gmail.com",
            department: "Design",
            position: "UI Designer",
            status: "On Leave"
        },
        {
            id: 4,
            name: "Sneha Patel",
            email: "sneha@gmail.com",
            department: "Marketing",
            position: "Marketing Executive",
            status: "Active"
        }
    ];

    return (
        <div
            className="mt-4 p-4 rounded-4 border"
            style={{
                background:
                    "linear-gradient(145deg, rgba(124,58,237,0.12), rgba(0,0,0,0.8))",
                borderColor: "rgba(168,85,247,0.2)"
            }}
        >

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="fw-bold mb-1">
                        Recent Employees
                    </h5>

                    <small className="text-secondary">
                        Recently added employees
                    </small>
                </div>

                <button
                    className="btn btn-sm px-3"
                    style={{
                        color: "#a855f7",
                        border: "1px solid rgba(168,85,247,0.3)"
                    }}
                >
                    View All
                    <i className="bi bi-arrow-right ms-2"></i>
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-dark table-borderless align-middle mb-0">
                    <thead>
                        <tr className="text-secondary small">
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                {/* Employee */}
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="rounded-circle d-flex justify-content-center align-items-center fw-semibold"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                background:
                                                    "linear-gradient(135deg, #7c3aed, #a855f7)"
                                            }}
                                        >
                                            {employee.name.charAt(0)}
                                        </div>

                                        <div>
                                            <div className="fw-semibold">
                                                {employee.name}
                                            </div>

                                            <small className="text-secondary">
                                                {employee.email}
                                            </small>
                                        </div>
                                    </div>
                                </td>

                                {/* Department */}
                                <td className="text-secondary">
                                    {employee.department}
                                </td>

                                {/* Position */}
                                <td className="text-secondary">
                                    {employee.position}
                                </td>

                                {/* Status */}
                                <td>
                                    <span
                                        className="px-2 py-1 rounded-pill small"
                                        style={{
                                            background:
                                                employee.status === "Active"
                                                    ? "rgba(34,197,94,0.12)"
                                                    : "rgba(234,179,8,0.12)",

                                            color:
                                                employee.status === "Active"
                                                    ? "#4ade80"
                                                    : "#facc15"
                                        }}
                                    >
                                        <i
                                            className={`bi ${
                                                employee.status === "Active"
                                                    ? "bi-check-circle-fill"
                                                    : "bi-clock-fill"
                                            } me-1`}
                                        ></i>
                                        {employee.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentEmployees;