import { useRef, useState, useEffect } from "react"
import React from "react";

//functional component
const Login = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // focus on the first input on first load
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // empty error while making input adjustments
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        <>
        {
            success ? (
                <section>
                    <h1>Sucssefully Logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to home</a>
                    </p>
                </section>
            ) : (
        
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                </label>
                <input 
                    type="text" 
                    id="username" 
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user} // clears the field when the user submits the form
                    required
                    
                />

                <label htmlFor="password">
                    Password:
                </label>
                <input 
                    type="password" 
                    id="password" 
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd} // clears the field when the user submits the form
                    required
                    
                />

                <button>Sign In</button>

            </form>

            <p>
                New Account?<br/>
                <a href="#">Sign Up</a>
            </p>

        </section>
            )
        }
        </>
    )
}

export default Login