import Video from "../../component/video/Video";
import Navbar from "../../component/Navbar/Navbar";

export default function Home() {
    return (
        <div className="position-relative min-vh-100 overflow-hidden">

            {/* Background Video */}
            <Video />

            {/* Dark Overlay */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                    background: "rgba(0, 0, 0, 0.45)",
                    zIndex: 0
                }}
            ></div>

            {/* Navbar */}
            <Navbar />

        </div>
    );
}