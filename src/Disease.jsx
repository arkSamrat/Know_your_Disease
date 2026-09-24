import { useState } from "react";
import "./Disease.css";

function Disease() {

    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");

    const findDisease = async () => {

        if (!symptoms.trim()) {
            alert("Please enter your symptoms");
            return;
        }

        setLoading(true);
        setResult("");

        try {

            const response = await fetch(
                "http://localhost:8080/api/disease/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: symptoms
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get disease information");
            }

            // Spring Boot returns String
            const data = await response.text();

            setResult(data);

            console.log("Disease response:", data);

        } catch (error) {

            console.log(error);
            alert("Unable to get disease information");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="disease-page">

            <nav className="disease-navbar">

                <div className="disease-logo">
                    <span>+</span>
                    MedAssist
                </div>

                <div className="disease-nav-links">
                    <button>Home</button>
                    <button>Disease</button>
                    <button>Profile</button>
                </div>

            </nav>


            <main className="disease-content">

                <section className="disease-hero">

                    <div className="disease-icon">
                        +
                    </div>

                    <h1>Know Your Disease</h1>

                    <p>
                        Understand possible health conditions, their
                        symptoms and why they may occur.
                    </p>


                    <div className="disease-search">

                        <textarea
                            value={symptoms}
                            onChange={(e) =>
                                setSymptoms(e.target.value)
                            }
                            placeholder={
                                "Describe your symptoms...\n\n" +
                                "Example: I have fever, headache, sore throat and tiredness."
                            }
                        />

                        <button
                            onClick={findDisease}
                            disabled={loading}
                        >
                            {loading
                                ? "Analyzing..."
                                : "Understand My Symptoms"}
                        </button>

                    </div>

                </section>


                {loading && (

                    <div className="disease-loading">

                        <div className="disease-spinner"></div>

                        <p>
                            Analyzing your symptoms...
                        </p>

                    </div>

                )}


                {result && !loading && (

                    <section className="disease-result">

                        <div className="result-title">

                            <span>AI Analysis</span>

                            <h2>
                                Disease Information
                            </h2>

                        </div>


                        <div className="info-card disease-response">

                            <div className="info-icon">
                                +
                            </div>

                            <h3>
                                Analysis
                            </h3>

                            <p className="llm-result">
                                {result}
                            </p>

                        </div>


                        <div className="warning-box">

                            <strong>
                                When should you see a doctor?
                            </strong>

                            <p>
                                If your symptoms are severe,
                                persistent, or getting worse,
                                consult a qualified healthcare
                                professional.
                            </p>

                        </div>


                        <div className="disease-disclaimer">

                            <strong>
                                Important:
                            </strong>

                            <span>
                                This information is for educational
                                purposes only and should not be
                                considered a medical diagnosis.
                                Always consult a qualified healthcare
                                professional for diagnosis and treatment.
                            </span>

                        </div>

                    </section>

                )}


                {!result && !loading && (

                    <section className="disease-features">

                        <h2>
                            What can you learn?
                        </h2>

                        <div className="feature-grid">

                            <div className="feature-card">

                                <div className="feature-icon">
                                    ?
                                </div>

                                <h3>
                                    Know Your Disease
                                </h3>

                                <p>
                                    Learn about possible conditions
                                    associated with your symptoms.
                                </p>

                            </div>


                            <div className="feature-card">

                                <div className="feature-icon">
                                    !
                                </div>

                                <h3>
                                    Understand Why
                                </h3>

                                <p>
                                    Understand possible causes and
                                    contributing factors.
                                </p>

                            </div>


                            <div className="feature-card">

                                <div className="feature-icon">
                                    +
                                </div>

                                <h3>
                                    Understand Symptoms
                                </h3>

                                <p>
                                    Learn about common symptoms and
                                    how they may relate to a condition.
                                </p>

                            </div>

                        </div>

                    </section>

                )}

            </main>

        </div>
    );
}

export default Disease;