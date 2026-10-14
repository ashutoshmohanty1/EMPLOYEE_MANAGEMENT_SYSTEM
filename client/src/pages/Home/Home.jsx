import Video from "../../component/video/Video";
import Navbar from "../../component/Navbar/Navbar";
import Hero from "../../component/Hero/Hero";
import Features from "../../component/Features/Features";
import About from "../../component/About/About";
import CTA from "../../component/CTA/CTA";

export default function Home() {
    return (
        <div className="position-relative">

            {/* One background video */}
            <Video />

            {/* Dark overlay */}
            <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{
                    background: "rgba(0, 0, 0, 0.45)",
                    zIndex: 0
                }}
            ></div>

            <div style={{ position: "relative", zIndex: 1 }}>

                <Navbar />

                <Hero />

                <Features />

                <About />

                <CTA />

            </div>

        </div>
    );
}