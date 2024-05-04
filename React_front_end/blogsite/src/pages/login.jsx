import React from "react";

export default function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">

                <div className="form-group">
                    <label htmlFor="email">E mail:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="social-login">
                <button><i className="fab fa-google"></i> Login with Google</button>
                <button><i className="fab fa-facebook"></i> Login with Facebook</button>
                <button><i className="fab fa-github"></i> Login with GitHub</button>
            </div>
        </div>
    );
}
