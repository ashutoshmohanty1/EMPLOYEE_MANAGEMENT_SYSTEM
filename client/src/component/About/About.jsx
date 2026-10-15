export default function About() {
    return (
        <section
            className="position-relative text-white py-5 overflow-hidden"
            style={{
                minHeight: "650px"
            }}
        >

            {/* Large Purple Glow - Right */}
            <div
                className="position-absolute top-50 end-0 translate-middle-y"
                style={{
                    width: "750px",
                    height: "750px",
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.60), rgba(76,29,149,0.25), transparent 70%)",
                    filter: "blur(45px)",
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            ></div>


            {/* Small Purple Glow - Left */}
            <div
                className="position-absolute"
                style={{
                    width: "350px",
                    height: "350px",
                    top: "10%",
                    left: "-200px",
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            ></div>


            {/* Content */}
            <div
                className="container position-relative py-5"
                style={{ zIndex: 1 }}
            >

                <div className="row align-items-center g-4 g-lg-5">

                    {/* LEFT CONTENT */}
                    <div className="col-12 col-lg-6">

                        <p className="text-uppercase fw-semibold text-white-50 mb-3">
                            About the System
                        </p>

                        <h2
                            className="fw-bold"
                            style={{
                                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                                lineHeight: "1.05"
                            }}
                        >
                            Everything your team needs,
                            <br className="d-none d-md-block" />
                            in one place.
                        </h2>

                        <p className="text-white-50 lead mt-4">
                            Employee Management System helps organizations
                            manage their employees, attendance, tasks and
                            important information through one simple platform.
                        </p>

                        <p className="text-white-50">
                            Instead of managing employee information across
                            different tools, everything can be organized and
                            accessed from one centralized system.
                        </p>

                    </div>


                    {/* RIGHT GLASS CARD */}
                    <div className="col-12 col-lg-6">

                        <div
                            className="p-4 p-md-5 rounded-4"
                            style={{
                                background: "rgba(15, 10, 25, 0.60)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                backdropFilter: "blur(14px)",
                                transition: "all 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-6px)";
                                e.currentTarget.style.borderColor =
                                    "rgba(168,85,247,0.7)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.borderColor =
                                    "rgba(255,255,255,0.18)";
                            }}
                        >

                            {/* Item 1 */}
                            <div className="mb-4">

                                <h4 className="fw-bold">
                                    Centralized Management
                                </h4>

                                <p className="text-white-50 mb-0">
                                    Keep employee information organized
                                    and accessible from one place.
                                </p>

                            </div>


                            {/* Item 2 */}
                            <div className="mb-4">

                                <h4 className="fw-bold">
                                    Better Productivity
                                </h4>

                                <p className="text-white-50 mb-0">
                                    Simplify daily employee management
                                    and reduce unnecessary manual work.
                                </p>

                            </div>


                            {/* Item 3 */}
                            <div>

                                <h4 className="fw-bold">
                                    Simple & Secure
                                </h4>

                                <p className="text-white-50 mb-0">
                                    Designed with a clean interface and
                                    secure access for authorized users.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}