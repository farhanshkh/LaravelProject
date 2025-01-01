import { useRef, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const codeRef = useRef();

    const { setUser, setToken } = useStateContext();

    const [step, setStep] = useState(1); // Step 1: Login, Step 2: 2FA Verification
    const [userId, setUserId] = useState(null);

    const submitLogin = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUserId(data.user_id); // Store user ID for 2FA
                setStep(2); // Move to 2FA step
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const submit2FA = (ev) => {
        ev.preventDefault();
        const payload = {
            user_id: userId,
            code: codeRef.current.value,
        };
        axiosClient
            .post("/verify-2fa", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login</h1>
                {step === 1 && (
                    <form onSubmit={submitLogin}>
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="btn btn-block">Login</button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={submit2FA}>
                        <input ref={codeRef} type="text" placeholder="Enter 2FA Code" />
                        <button className="btn btn-block">Verify</button>
                    </form>
                )}
            </div>
        </div>
    );
}
