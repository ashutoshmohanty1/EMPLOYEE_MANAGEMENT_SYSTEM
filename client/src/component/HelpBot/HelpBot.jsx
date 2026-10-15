import { useState } from "react";
import "./HelpBot.css";

export default function HelpBot() {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Help Popup */}
            {open && (
                <div className="help-popup">

                    {/* Character */}
                    <div className="help-character">
                        <div className="character-body">
                            <div className="character-eye"></div>
                            <div className="character-eye"></div>
                        </div>

                        <div className="character-shadow"></div>
                    </div>


                    {/* Chat Content */}
                    <div className="help-content">

                        <div className="d-flex justify-content-between align-items-center">

                            <h5 className="fw-bold mb-0">
                                Need Help?
                            </h5>

                            <button
                                className="help-close"
                                onClick={() => setOpen(false)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </div>


                        <p className="text-white-50 mt-3 mb-3">
                            Hi there! 👋
                            <br />
                            What do you need help with?
                        </p>


                        <div className="help-input">

                            <input
                                type="text"
                                placeholder="Ask something..."
                            />

                            <button>
                                <i className="bi bi-send-fill"></i>
                            </button>

                        </div>


                        {/* Quick Questions */}
                        <div className="d-flex flex-wrap gap-2 mt-3">

                            <button className="help-question">
                                Login Help
                            </button>

                            <button className="help-question">
                                Register Help
                            </button>

                            <button className="help-question">
                                Other
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* Floating Help Button */}
            <button
                className={`help-button ${open ? "help-button-open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="Open help"
            >

                <i
                    className={`bi ${
                        open
                            ? "bi-x-lg"
                            : "bi-question-lg"
                    }`}
                ></i>

                {!open && (
                    <span className="help-button-text">
                        Help
                    </span>
                )}

            </button>

        </>
    );
}