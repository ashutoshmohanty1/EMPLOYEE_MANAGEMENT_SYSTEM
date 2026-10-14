export default function Video() {
    return (
        <video
            className="position-fixed top-0 start-0 w-100 h-100"
            autoPlay
            muted
            loop
            playsInline
            style={{
                objectFit: "cover",
                zIndex: -1
            }}
        >
            <source
                src="/video/hero.mp4"
                type="video/mp4"
            />

            Your browser does not support the video tag.
        </video>
    );
}