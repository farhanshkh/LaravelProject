import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            firstname: fnameRef.current.value,
            lastname: lnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (!emailRegex.test(payload.email)) {
            alert("Please Enter a Valid Email");
            return;
        }

        if (!passwordRegex.test(payload.password)) {
            alert(
                "Password must of 8 character, it should contain alteast number, special character and One Capital Letter"
            );
            return;
        }

        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.error("Validation Errors:", response.data.errors);
                } else {
                    console.error("An error occurred:", err);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={fnameRef}
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        required
                    />
                    <input
                        ref={lnameRef}
                        type="text"
                        name="lastname"
                        placeholder="LastName"
                        required
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <button className="btn btn-block" type="submit">
                        Register
                    </button>
                    <p className="message">
                        Already Have An Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
