import { useRef } from "react";

function Twofactorlogin() {
    const emailref = useRef();
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">SMS Verfication</h1>
                <form>
                    <input type="text" placeholder="Enter Verifaction Code" />
                    <button className="btn btn-block">Verify</button>
                </form>
            </div>
        </div>
    );
}

export default Twofactorlogin;
