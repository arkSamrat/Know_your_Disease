
import { useState } from "react";
import "./Auth.css";
import axios from 'axios';
import MedAssist from "./MedAssist";
import {useNavigate} from 'react-router-dom'



function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Login:", loginData);
        
        // API call will go here
        const response = await axios.post("http://localhost:8080/api/auth/login",{email:loginData.email,password:loginData.password});
        if(response.data)
        {
            navigate("/api/medassist");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("Register:", registerData);

        // API call will go here
        // POST http://localhost:8080/api/auth/register

        const response = await axios.post("http://localhost:8080/api/auth/register",registerData);
        console.log(response.data);
        if(response.data)
        {
            navigate('/api/medassist');
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <div className="auth-header">
                    <h1>MedAssist</h1>
                    <p>
                        {isLogin
                            ? "Login to your account"
                            : "Create your MedAssist account"}
                    </p>
                </div>

                {isLogin ? (

                    <form onSubmit={handleLogin}>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        email: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Login
                        </button>

                    </form>

                ) : (

                    <form onSubmit={handleRegister}>

                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={registerData.name}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        name: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={registerData.email}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        email: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                value={registerData.password}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        password: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Register
                        </button>

                    </form>
                )}

                <div className="switch-auth">

                    {isLogin ? (
                        <p>
                            Don't have an account?
                            <button
                                onClick={() => setIsLogin(false)}
                                className="switch-button"
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?
                            <button
                                onClick={() => setIsLogin(true)}
                                className="switch-button"
                            >
                                Login
                            </button>
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Auth;

