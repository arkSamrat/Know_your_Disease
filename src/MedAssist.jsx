
import React, { useState } from "react";
import "./MedAssist.css";
import { useNavigate } from "react-router-dom";

function MedAssist() {

    const navigate = useNavigate();

    const [symptoms, setSymptoms] = useState("");
    const [loading, setLoading] = useState(false);
    const [medicines, setMedicines] = useState("");

    const getRecommendations = async () => {
        if (!symptoms.trim()) {
            alert("Please enter your symptoms");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/medicine/recommend",
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
                const error = await response.text();
                console.error("Backend error:", error);
                alert("Something went wrong");
                return;
            }

            const data = await response.text();

            console.log(data);
            setMedicines(data);

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="medassist">

            <nav className="navbar">

                <div className="logo">
                    <span>+</span> MedAssist
                </div>

                <div className="nav-right">

                    <button
                        className="profile-btn"
                        onClick={() => navigate("/api/disease")}
                    >
                        Know Your Disease
                    </button>

                    <button className="profile-btn">
                        Profile
                    </button>

                    <button className="logout-btn">
                        Logout
                    </button>

                </div>

            </nav>


            <main className="main-content">

                <section className="hero">

                    <div className="hero-icon">
                        +
                    </div>

                    <h1>Your AI Medicine Assistant</h1>

                    <p>
                        Describe your symptoms and get medicine information
                        based on your condition.
                    </p>

                    <div className="search-box">

                        <textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Example: I have fever, headache and body pain..."
                        />

                        <button
                            onClick={getRecommendations}
                            disabled={loading}
                        >
                            {loading
                                ? "Finding Medicines..."
                                : "Get Recommendations"}
                        </button>

                    </div>

                </section>


                <section className="recommendations">

                    <div className="section-header">

                        <h2>Medicine Information</h2>

                    </div>


                    {!medicines && !loading && (

                        <div className="empty-state">

                            <div className="empty-icon">
                                +
                            </div>

                            <h3>No recommendations yet</h3>

                            <p>
                                Enter your symptoms above to get medicine
                                information.
                            </p>

                        </div>

                    )}


                    {loading && (

                        <div className="loading">

                            <div className="spinner"></div>

                            <p>
                                Analyzing your symptoms...
                            </p>

                        </div>

                    )}


                    {medicines && !loading && (

                        <div className="medicine-response">

                            <p>
                                {medicines}
                            </p>

                        </div>

                    )}

                </section>

            </main>


            <footer>

                <p>
                    MedAssist provides medicine information for
                    educational purposes. Consult a qualified doctor
                    before taking medication.
                </p>

            </footer>

        </div>
    );
}

export default MedAssist;
