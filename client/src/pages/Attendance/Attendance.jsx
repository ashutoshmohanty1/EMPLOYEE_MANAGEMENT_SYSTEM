
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../component/Sidebar/Sidebar";
import DashboardNavbar from "../../component/DashboardNavbar/DashboardNavbar";

const Attendance = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [month, setMonth] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        return dateKey(now);
    });

    // Frontend preview state. These records are not saved to MySQL yet.
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [schedules, setSchedules] = useState([]);

    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [scheduleTitle, setScheduleTitle] = useState("");
    const [scheduleDescription, setScheduleDescription] = useState("");
    const [scheduleType, setScheduleType] = useState("todo");
    const [scheduleStart, setScheduleStart] = useState("09:00");
    const [scheduleEnd, setScheduleEnd] = useState("10:00");
    const [formError, setFormError] = useState("");

    function dateKey(date) {
        const year = date.getFullYear();
        const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${monthNumber}-${day}`;
    }

    const today = new Date();
    const todayKey = dateKey(today);
    const isFuture = selectedDate > todayKey;
    const selectedRecord = attendanceRecords[selectedDate] || {};
    const selectedSchedules = schedules.filter(
        (item) => item.date === selectedDate
    );

    // Fetch the logged-in employee profile.
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
                if ([401, 403].includes(error.response?.status)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login", { replace: true });
                } else {
                    console.error("Failed to load profile:", error.message);
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const monthLabel = month.toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
    });

    const daysInMonth = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0
    ).getDate();

    // Monday-first calendar.
    const firstDayOffset =
        (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;

    
    const formatDate = (key) => {
        // Accept either a date string or a JavaScript Date object
        const date =
            key instanceof Date
                ? key
                : new Date(
                    Number(key.split("-")[0]),
                    Number(key.split("-")[1]) - 1,
                    Number(key.split("-")[2])
                );

        return date.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };


    const formatTime = (value) => {
        if (!value) return "—";

        return new Date(value).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const workMinutes = (record) => {
        if (!record.checkIn) return 0;

        const start = new Date(record.checkIn).getTime();
        const end = record.checkOut
            ? new Date(record.checkOut).getTime()
            : selectedDate === todayKey
            ? Date.now()
            : start;

        return Math.max(0, Math.floor((end - start) / 60000));
    };

    const durationLabel = (minutes) =>
        `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

    const updateAttendance = (callback) => {
        if (isFuture) return;

        setAttendanceRecords((previous) => {
            const existing = previous[selectedDate] || {};

            return {
                ...previous,
                [selectedDate]: callback(existing)
            };
        });
    };

    const markPresent = () => {
        updateAttendance((record) => ({
            ...record,
            status: "present"
        }));
    };

    const markAbsent = () => {
        if (selectedDate === todayKey && selectedRecord.checkIn) {
            return;
        }

        updateAttendance((record) => ({
            ...record,
            status: "absent",
            checkIn: null,
            checkOut: null
        }));
    };

    const handleCheckIn = () => {
        if (isFuture || selectedRecord.checkIn) return;

        updateAttendance((record) => ({
            ...record,
            status: "present",
            checkIn: new Date().toISOString(),
            checkOut: null
        }));
    };

    const handleCheckOut = () => {
        if (
            isFuture ||
            !selectedRecord.checkIn ||
            selectedRecord.checkOut
        ) {
            return;
        }

        updateAttendance((record) => ({
            ...record,
            status: "present",
            checkOut: new Date().toISOString()
        }));
    };

    const goToMonth = (amount) => {
        setMonth(
            new Date(
                month.getFullYear(),
                month.getMonth() + amount,
                1
            )
        );
    };

    const addSchedule = (event) => {
        event.preventDefault();
        setFormError("");

        if (!scheduleTitle.trim()) {
            setFormError("Please enter a title.");
            return;
        }

        if (
            scheduleType === "event" &&
            scheduleStart &&
            scheduleEnd &&
            scheduleEnd <= scheduleStart
        ) {
            setFormError("End time must be later than start time.");
            return;
        }

        if (isFuture === false && selectedDate < todayKey) {
            // Past dates can still have schedules.
        }

        const newSchedule = {
            id: `${Date.now()}-${Math.random()}`,
            title: scheduleTitle.trim(),
            description: scheduleDescription.trim(),
            date: selectedDate,
            startTime: scheduleStart,
            endTime: scheduleEnd,
            type: scheduleType,
            completed: false
        };

        setSchedules((previous) => [...previous, newSchedule]);
        setScheduleTitle("");
        setScheduleDescription("");
        setScheduleType("todo");
        setScheduleStart("09:00");
        setScheduleEnd("10:00");
        setShowScheduleForm(false);
    };

    const toggleSchedule = (id) => {
        setSchedules((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };

    const deleteSchedule = (id) => {
        setSchedules((previous) =>
            previous.filter((item) => item.id !== id)
        );
    };

    const statusColors = {
        present: "#22c55e",
        absent: "#ef4444",
        unmarked: "#292033"
    };

    const completedSchedules = selectedSchedules.filter(
        (item) => item.completed
    ).length;

    return (
        <div className="ems-layout bg-black text-white d-flex">
            {/* Fixed sidebar */}
            <div
                className={`employee-sidebar ${
                    sidebarOpen ? "employee-sidebar-open" : ""
                }`}
            >
                <Sidebar />
            </div>

            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="attendance-backdrop d-lg-none"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Independently scrollable main content */}
            <main className="ems-main flex-grow-1 p-2 p-sm-3 p-md-4">
                <DashboardNavbar
                    user={user}
                    onMenuClick={() => setSidebarOpen((open) => !open)}
                />

                <div className="attendance-content p-2 p-md-4">
                    <div className="mb-4">
                        <h2 className="fw-bold attendance-heading">
                            My Attendance
                        </h2>
                        <p className="text-secondary mb-0">
                            Track attendance, working hours, events, and to-do
                            items in one place.
                        </p>
                    </div>

                    {/* Month selector */}
                    <section className="attendance-panel p-3 p-md-4 mb-4">
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Attendance Calendar
                                </h5>
                                <p className="text-secondary small mb-0">
                                    Select a day to mark attendance or manage
                                    your schedule.
                                </p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => goToMonth(-1)}
                                    aria-label="Previous month"
                                >
                                    <i className="bi bi-chevron-left" />
                                </button>

                                <span className="fw-semibold month-label">
                                    {monthLabel}
                                </span>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => goToMonth(1)}
                                    aria-label="Next month"
                                    disabled={
                                        month.getFullYear() === today.getFullYear() &&
                                        month.getMonth() === today.getMonth()
                                    }
                                >
                                    <i className="bi bi-chevron-right" />
                                </button>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="d-flex flex-wrap gap-3 mb-3 small text-secondary">
                            <span className="legend-item">
                                <span className="legend-square" style={{ background: "#22c55e" }} />
                                Present
                            </span>
                            <span className="legend-item">
                                <span className="legend-square" style={{ background: "#ef4444" }} />
                                Absent
                            </span>
                            <span className="legend-item">
                                <span className="legend-square" style={{ background: "#0e7490" }} />
                                Has schedule
                            </span>
                            <span className="legend-item">
                                <span className="legend-square" style={{ background: "#a855f7" }} />
                                Today
                            </span>
                        </div>

                        {/* GitHub-style calendar grid */}
                        <div className="calendar-scroll">
                            <div className="attendance-calendar">
                                <div className="weekday-labels">
                                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                                        (day) => (
                                            <span key={day}>{day}</span>
                                        )
                                    )}
                                </div>

                                <div className="contribution-grid">
                                    {Array.from(
                                        { length: firstDayOffset },
                                        (_, index) => (
                                            <span
                                                key={`empty-${index}`}
                                                className="contribution-empty"
                                            />
                                        )
                                    )}

                                    {Array.from(
                                        { length: daysInMonth },
                                        (_, index) => {
                                            const day = index + 1;
                                            const date = new Date(
                                                month.getFullYear(),
                                                month.getMonth(),
                                                day
                                            );
                                            const key = dateKey(date);
                                            const record = attendanceRecords[key] || {};
                                            const hasSchedules = schedules.some(
                                                (item) => item.date === key
                                            );
                                            const isToday = key === todayKey;
                                            const isSelected = key === selectedDate;

                                            let background =
                                                statusColors[record.status || "unmarked"];

                                            if (!record.status && hasSchedules) {
                                                background = "#0e7490";
                                            }

                                            if (isToday && !record.status) {
                                                background = "#7c3aed";
                                            }

                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`contribution-day ${
                                                        isSelected ? "selected-day" : ""
                                                    }`}
                                                    style={{ background }}
                                                    onClick={() => {
                                                        setSelectedDate(key);
                                                        setShowScheduleForm(false);
                                                        setFormError("");
                                                    }}
                                                    aria-pressed={isSelected}
                                                    title={`${formatDate(key)}${
                                                        record.status
                                                            ? ` — ${record.status}`
                                                            : ""
                                                    }${hasSchedules ? " — has schedule" : ""}`}
                                                >
                                                    {day}
                                                    {hasSchedules && (
                                                        <span className="calendar-event-dot" />
                                                    )}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-secondary small mt-3 mb-0">
                            Green = present, red = absent, teal = scheduled
                            activity. Select any date to edit its details.
                        </p>
                    </section>

                    {/* Selected date */}
                    <section className="attendance-panel p-3 p-md-4 mb-4">
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
                            <div>
                                <small className="text-secondary">
                                    SELECTED DATE
                                </small>
                                <h4 className="fw-bold mb-1">
                                    {formatDate(
                                        new Date(
                                            Number(selectedDate.split("-")[0]),
                                            Number(selectedDate.split("-")[1]) - 1,
                                            Number(selectedDate.split("-")[2])
                                        )
                                    )}
                                </h4>
                                </div>

                                <span className="date-badge">
                                    {selectedDate === todayKey
                                        ? "Today"
                                        : isFuture
                                        ? "Future date"
                                        : "Past date"}
                                </span>
                            </div>

                            {isFuture && (
                                <p className="text-warning small mb-3">
                                    Attendance cannot be marked for a future date.
                                    You can still create schedules.
                                </p>
                            )}

                            {/* Attendance actions */}
                            <div className="row g-3 mb-4">
                                <div className="col-12 col-sm-4">
                                    <div className="time-card">
                                        <i className="bi bi-box-arrow-in-right text-success fs-4" />
                                        <small className="text-secondary">
                                            Check-in
                                        </small>
                                        <h5 className="fw-bold mb-0">
                                            {formatTime(selectedRecord.checkIn)}
                                        </h5>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-4">
                                    <div className="time-card">
                                        <i className="bi bi-box-arrow-right text-info fs-4" />
                                        <small className="text-secondary">
                                            Check-out
                                        </small>
                                        <h5 className="fw-bold mb-0">
                                            {formatTime(selectedRecord.checkOut)}
                                        </h5>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-4">
                                    <div className="time-card">
                                        <i className="bi bi-clock-history text-purple fs-4" />
                                        <small className="text-secondary">
                                            Work duration
                                        </small>
                                        <h5 className="fw-bold mb-0">
                                            {durationLabel(workMinutes(selectedRecord))}
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleCheckIn}
                                    disabled={
                                        isFuture ||
                                        !!selectedRecord.checkIn ||
                                        !!selectedRecord.checkOut
                                    }
                                >
                                    <i className="bi bi-box-arrow-in-right me-2" />
                                    Check In
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={handleCheckOut}
                                    disabled={
                                        isFuture ||
                                        !selectedRecord.checkIn ||
                                        !!selectedRecord.checkOut
                                    }
                                >
                                    <i className="bi bi-box-arrow-right me-2" />
                                    Check Out
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={markAbsent}
                                    disabled={
                                        isFuture ||
                                        !!selectedRecord.checkIn
                                    }
                                >
                                    Mark Absent
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={markPresent}
                                    disabled={
                                        isFuture ||
                                        selectedRecord.status === "present"
                                    }
                                >
                                    Mark Present
                                </button>
                            </div>

                            <p className="text-secondary small mt-3 mb-0">
                                Preview only: attendance and schedules are
                                currently held in page state, not saved to the
                                database.
                            </p>
                    </section>

                    {/* Schedule list */}
                    <section className="attendance-panel p-3 p-md-4 mb-4">
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                            <div>
                                <h5 className="fw-bold mb-1">
                                    Schedule for Selected Day
                                </h5>
                                <p className="text-secondary small mb-0">
                                    {selectedSchedules.length} item(s) ·{" "}
                                    {completedSchedules} completed
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn btn-info text-white"
                                onClick={() => {
                                    setShowScheduleForm((open) => !open);
                                    setFormError("");
                                }}
                            >
                                <i className="bi bi-plus-lg me-2" />
                                Add Schedule
                            </button>
                        </div>

                        {showScheduleForm && (
                            <form
                                className="schedule-form p-3 p-md-4 mb-4"
                                onSubmit={addSchedule}
                            >
                                <h6 className="fw-bold mb-3">
                                    Create an event or to-do
                                </h6>

                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">
                                            Title
                                        </label>
                                        <input
                                            className="form-control schedule-input"
                                            value={scheduleTitle}
                                            onChange={(event) =>
                                                setScheduleTitle(event.target.value)
                                            }
                                            placeholder="e.g. Team meeting"
                                            maxLength={150}
                                            required
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label className="form-label">
                                            Type
                                        </label>
                                        <select
                                            className="form-select schedule-input"
                                            value={scheduleType}
                                            onChange={(event) =>
                                                setScheduleType(event.target.value)
                                            }
                                        >
                                            <option value="todo">To-do</option>
                                            <option value="event">Event</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Description (optional)
                                        </label>
                                        <textarea
                                            className="form-control schedule-input"
                                            rows={2}
                                            value={scheduleDescription}
                                            onChange={(event) =>
                                                setScheduleDescription(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Add a few details..."
                                            maxLength={1000}
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <label className="form-label">
                                            Date
                                        </label>
                                        <input
                                            className="form-control schedule-input"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(event) => {
                                                if (event.target.value) {
                                                    setSelectedDate(event.target.value);
                                                }
                                            }}
                                            required
                                        />
                                    </div>

                                    {scheduleType === "event" && (
                                        <>
                                            <div className="col-6 col-sm-3">
                                                <label className="form-label">
                                                    Start time
                                                </label>
                                                <input
                                                    className="form-control schedule-input"
                                                    type="time"
                                                    value={scheduleStart}
                                                    onChange={(event) =>
                                                        setScheduleStart(event.target.value)
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div className="col-6 col-sm-3">
                                                <label className="form-label">
                                                    End time
                                                </label>
                                                <input
                                                    className="form-control schedule-input"
                                                    type="time"
                                                    value={scheduleEnd}
                                                    onChange={(event) =>
                                                        setScheduleEnd(event.target.value)
                                                    }
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {formError && (
                                    <p className="text-danger small mt-3 mb-0">
                                        {formError}
                                    </p>
                                )}

                                <div className="d-flex flex-wrap gap-2 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-info text-white"
                                    >
                                        <i className="bi bi-check-lg me-2" />
                                        Save Schedule
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setShowScheduleForm(false);
                                            setFormError("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {selectedSchedules.length === 0 ? (
                            <div className="empty-schedule text-center py-4">
                                <i className="bi bi-calendar-plus fs-1 text-secondary" />
                                <p className="text-secondary mt-2 mb-0">
                                    No schedules for this date yet.
                                </p>
                                <small className="text-secondary">
                                    Select Add Schedule to create an event or
                                    to-do.
                                </small>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {selectedSchedules.map((item) => (
                                    <article
                                        key={item.id}
                                        className={`schedule-item p-3 ${
                                            item.completed ? "schedule-completed" : ""
                                        }`}
                                    >
                                        <div className="d-flex align-items-start gap-3">
                                            <input
                                                className="form-check-input mt-1"
                                                type="checkbox"
                                                checked={item.completed}
                                                onChange={() =>
                                                    toggleSchedule(item.id)
                                                }
                                                aria-label={`Mark ${item.title} completed`}
                                            />

                                            <div className="flex-grow-1 schedule-item-body">
                                                <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                                                    <strong
                                                        className={
                                                            item.completed
                                                                ? "completed-title"
                                                                : ""
                                                        }
                                                    >
                                                        {item.title}
                                                    </strong>

                                                    <span
                                                        className={`schedule-type ${
                                                            item.type === "event"
                                                                ? "event-type"
                                                                : "todo-type"
                                                        }`}
                                                    >
                                                        {item.type === "event"
                                                            ? "Event"
                                                            : "To-do"}
                                                    </span>

                                                    {item.completed && (
                                                        <span className="text-success small">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>

                                                {item.description && (
                                                    <p className="text-secondary small mb-2">
                                                        {item.description}
                                                    </p>
                                                )}

                                                {item.type === "event" && (
                                                    <small className="text-secondary">
                                                        <i className="bi bi-clock me-2" />
                                                        {item.startTime} – {item.endTime}
                                                    </small>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger flex-shrink-0"
                                                aria-label={`Delete ${item.title}`}
                                                title="Delete schedule"
                                                onClick={() =>
                                                    deleteSchedule(item.id)
                                                }
                                            >
                                                <i className="bi bi-trash" />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <style>{`
                .ems-layout {
                    width: 100%;
                    height: 100vh;
                    height: 100dvh;
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

                .attendance-backdrop {
                    display: none;
                }

                .attendance-content {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .attendance-heading {
                    font-size: clamp(28px, 3vw, 40px);
                    overflow-wrap: anywhere;
                }

                .attendance-panel {
                    background: linear-gradient(
                        145deg,
                        rgba(124,58,237,0.10),
                        rgba(15,15,20,0.98)
                    );
                    border: 1px solid rgba(168,85,247,0.2);
                    border-radius: 18px;
                }

                .month-label {
                    min-width: 130px;
                    text-align: center;
                }

                .calendar-scroll {
                    width: 100%;
                    overflow-x: auto;
                    padding: 4px 2px 8px;
                }

                .attendance-calendar {
                    min-width: 310px;
                }

                .weekday-labels,
                .contribution-grid {
                    display: grid;
                    grid-template-columns: repeat(7, minmax(0, 1fr));
                    gap: 8px;
                }

                .weekday-labels {
                    margin-bottom: 10px;
                }

                .weekday-labels span {
                    color: #9ca3af;
                    text-align: center;
                    font-size: 12px;
                }

                .contribution-day,
                .contribution-empty {
                    width: 100%;
                    aspect-ratio: 1;
                    min-width: 0;
                    border-radius: 5px;
                }

                .contribution-day {
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.12);
                    color: #fff;
                    font-size: 12px;
                    cursor: pointer;
                    transition: transform 0.15s ease;
                }

                .contribution-day:hover {
                    transform: scale(1.06);
                }

                .contribution-day.selected-day {
                    outline: 2px solid #ffffff;
                    outline-offset: 2px;
                }

                .calendar-event-dot {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    bottom: 3px;
                    right: 3px;
                    background: #5eead4;
                    border: 1px solid rgba(0,0,0,0.4);
                }

                .legend-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                }

                .legend-square {
                    display: inline-block;
                    width: 11px;
                    height: 11px;
                    border-radius: 3px;
                    flex-shrink: 0;
                }

                .date-badge {
                    padding: 7px 12px;
                    border-radius: 20px;
                    background: rgba(168,85,247,0.14);
                    color: #d8b4fe;
                    font-size: 13px;
                }

                .time-card {
                    height: 100%;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 16px;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    background: rgba(255,255,255,0.025);
                }

                .text-purple {
                    color: #c084fc;
                }

                .schedule-form {
                    background: rgba(8,145,178,0.07);
                    border: 1px solid rgba(45,212,191,0.25);
                    border-radius: 14px;
                }

                .schedule-input {
                    background-color: #101018;
                    border-color: #383342;
                    color: #fff;
                }

                .schedule-input:focus {
                    background-color: #101018;
                    color: #fff;
                    border-color: #2dd4bf;
                    box-shadow: 0 0 0 0.2rem rgba(45,212,191,0.12);
                }

                .schedule-input::placeholder {
                    color: #777481;
                }

                .schedule-input option {
                    background: #101018;
                    color: #fff;
                }

                .schedule-item {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-left: 3px solid #0e7490;
                    border-radius: 12px;
                }

                .schedule-item-body {
                    min-width: 0;
                    overflow-wrap: anywhere;
                }

                .schedule-completed {
                    opacity: 0.7;
                }

                .completed-title {
                    text-decoration: line-through;
                    color: #9ca3af;
                }

                .schedule-type {
                    font-size: 11px;
                    padding: 4px 8px;
                    border-radius: 20px;
                }

                .event-type {
                    color: #67e8f9;
                    background: rgba(8,145,178,0.16);
                }

                .todo-type {
                    color: #d8b4fe;
                    background: rgba(124,58,237,0.16);
                }

                .empty-schedule {
                    border: 1px dashed rgba(255,255,255,0.12);
                    border-radius: 12px;
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
                        transition:
                            transform 0.25s ease,
                            visibility 0.25s ease;
                        z-index: 1050;
                    }

                    .ems-layout > .employee-sidebar.employee-sidebar-open {
                        transform: translateX(0);
                        visibility: visible;
                    }

                    .ems-layout > .employee-sidebar > .ems-sidebar {
                        height: 100%;
                    }

                    .attendance-backdrop {
                        display: block;
                        position: fixed;
                        inset: 0;
                        z-index: 1040;
                        width: 100%;
                        height: 100%;
                        border: 0;
                        padding: 0;
                        background: rgba(0,0,0,0.65);
                    }
                }

                @media (max-width: 575.98px) {
                    .attendance-content {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }

                    .attendance-panel {
                        border-radius: 14px;
                    }

                    .weekday-labels,
                    .contribution-grid {
                        gap: 5px;
                    }

                    .contribution-day {
                        font-size: 10px;
                    }

                    .month-label {
                        min-width: 105px;
                        font-size: 13px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .contribution-day,
                    .ems-layout > .employee-sidebar {
                        transition: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Attendance;
