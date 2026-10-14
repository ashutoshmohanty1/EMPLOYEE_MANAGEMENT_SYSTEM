import { Link } from "react-router-dom";
import Video from "../video/Video";

export default function CTA() {
    return (
        <section
            className="position-relative text-white py-5 overflow-hidden"
            style={{
                minHeight: "600px"
            }}
        >

            {/* Background Video */}
            <Video />


            {/* Dark Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: "rgba(0, 0, 0, 0.55)",
                    zIndex: 0
                }}
            ></div>


            {/* Center Purple Glow */}
            <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                    width: "700px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.65) 0%, rgba(76,29,149,0.3) 40%, transparent 70%)",
                    filter: "blur(30px)",
                    zIndex: 1,
                    pointerEvents: "none"
                }}
            ></div>


            {/* CTA Content */}
            <div
                className="container position-relative py-5"
                style={{ zIndex: 2 }}
            >

                <div
                    className="text-center mx-auto p-5 rounded-4"
                    style={{
                        maxWidth: "900px",
                        background: "rgba(20, 15, 30, 0.65)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(12px)"
                    }}
                >

                    <p className="text-uppercase fw-semibold text-white-50">
                        Get Started
                    </p>

                    <h2 className="display-5 fw-bold mt-3">
                        Ready to manage your employees?
                    </h2>

                    <p
                        className="lead text-white-50 mt-3 mx-auto"
                        style={{ maxWidth: "650px" }}
                    >
                        Simplify employee management, attendance and
                        tasks with one powerful platform.
                    </p>

                    <Link
                        to="/register"
                        className="btn btn-light btn-lg px-5 mt-4"
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </section>
    );
}