export default function Features() {

    const features = [
        {
            title: "Employee Management",
            description:
                "Manage employee information, profiles, departments and other important details in one place.",
            icon: "bi bi-people"
        },
        {
            title: "Attendance Tracking",
            description:
                "Keep track of employee attendance and maintain accurate attendance records.",
            icon: "bi bi-calendar-check"
        },
        {
            title: "Task Management",
            description:
                "Assign tasks to employees and keep track of their work and progress.",
            icon: "bi bi-list-check"
        },
        {
            title: "Secure Access",
            description:
                "Keep employee and system information protected with secure authentication.",
            icon: "bi bi-shield-check"
        }
    ];

    return (
        <section
            className="position-relative text-white py-5 overflow-hidden"
            style={{
                minHeight: "650px"
            }}
        >


            {/* Content */}
            <div
                className="container position-relative py-5"
                style={{ zIndex: 1 }}
            >

                <div className="text-center mb-5">

                    <p className="text-uppercase fw-semibold text-white-50">
                        Features
                    </p>

                    <h2 className="display-5 fw-bold">
                        Everything you need
                    </h2>

                    <p
                        className="text-white-50 mx-auto mt-3"
                        style={{ maxWidth: "650px" }}
                    >
                        Manage your employees and daily operations
                        with simple and powerful tools.
                    </p>

                </div>


                <div className="row g-4">

                    {features.map((feature, index) => (
                        <div
                            className="col-md-6 col-lg-3"
                            key={index}
                        >

                            <div
                                className="h-100 p-4 rounded-4"
                                style={{
                                    background: "rgba(15, 10, 25, 0.60)",
                                    border: "1px solid rgba(255,255,255,0.16)",
                                    backdropFilter: "blur(12px)"
                                }}
                            >

                                <i
                                    className={`${feature.icon} fs-1 text-white`}
                                ></i>

                                <h4 className="mt-4 fw-semibold">
                                    {feature.title}
                                </h4>

                                <p className="text-white-50 mt-3 mb-0">
                                    {feature.description}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}