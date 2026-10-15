import { Link } from "react-router-dom";

export default function CTA() {
    return (
        <section
            className="position-relative text-white py-5 overflow-hidden"
            style={{
                minHeight: "600px"
            }}
        >

            {/* Big Center Purple Glow */}
            <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                    width: "900px",
                    height: "650px",
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.70) 0%, rgba(124,58,237,0.40) 35%, rgba(76,29,149,0.15) 55%, transparent 75%)",
                    filter: "blur(45px)",
                    zIndex: 0,
                    pointerEvents: "none"
                }}
            ></div>


            {/* Content */}
            <div
                className="container position-relative d-flex align-items-center justify-content-center py-5"
                style={{
                    minHeight: "600px",
                    zIndex: 1
                }}
            >

                <div
                    className="text-center w-100 p-4 p-md-5 rounded-4"
                    style={{
                        maxWidth: "900px",
                        background: "rgba(15, 10, 25, 0.60)",
                        border: "1px solid rgba(255,255,255,0.20)",
                        backdropFilter: "blur(14px)"
                    }}
                >

                    <p className="text-uppercase fw-semibold text-white-50 mb-2">
                        Get Started
                    </p>

                    <h2
                        className="fw-bold"
                        style={{
                            fontSize: "clamp(2.2rem, 5vw, 4rem)",
                            lineHeight: "1.05"
                        }}
                    >
                        Ready to manage
                        <br className="d-none d-md-block" />
                        your employees?
                    </h2>

                    <p
                        className="lead text-white-50 mx-auto mt-4"
                        style={{
                            maxWidth: "650px"
                        }}
                    >
                        Simplify employee management, attendance and
                        tasks with one powerful platform.
                    </p>

                    <Link
                        to="/register"
                        className="btn btn-light btn-lg px-4 px-md-5 mt-3"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </section>
    );
}