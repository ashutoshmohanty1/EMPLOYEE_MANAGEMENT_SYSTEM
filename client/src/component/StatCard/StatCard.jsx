import React from "react";

const StatCard = ({ title, value, icon, change, changeText, positive }) => {
    return (
        <div
            className="p-4 rounded-4 border h-100"
            style={{
                background:
                    "linear-gradient(145deg, rgba(124,58,237,0.15), rgba(0,0,0,0.8))",
                borderColor: "rgba(168,85,247,0.2)"
            }}
        >
            <div className="d-flex justify-content-between align-items-start">
                {/* Icon */}
                <div
                    className="d-flex justify-content-center align-items-center rounded-3"
                    style={{
                        width: "48px",
                        height: "48px",
                        background: "rgba(124,58,237,0.2)",
                        color: "#a855f7"
                    }}
                >
                    <i className={`bi ${icon} fs-5`}></i>
                </div>

                {/* Change */}
                <span
                    className="small px-2 py-1 rounded-pill"
                    style={{
                        background: positive
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(239,68,68,0.12)",
                        color: positive ? "#4ade80" : "#f87171"
                    }}
                >
                    {change}
                </span>
            </div>

            {/* Information */}
            <div className="mt-4">
                <p className="text-secondary mb-1">
                    {title}
                </p>

                <div className="d-flex align-items-end gap-2">
                    <h2 className="fw-bold mb-0">
                        {value}
                    </h2>

                    <small className="text-secondary mb-1">
                        {changeText}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default StatCard;