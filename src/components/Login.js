import { useRef, useState, useEffect } from "react"
import React from "react";
// import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios'
import {Link, useNavigate, useLocation} from "react-router-dom";

const LOGIN_URL= '/auth'; 

//functional component
const Login = () => {
    // const {setAuth} = useContext(AuthContext);
    const {setAuth} = useAuth();

    const navigate = useNavigate();
   
    // Get the current location to understand where the user came from
    const location = useLocation();
   
    // get the user back to where they came from to login page, after a success login
    // If there is a "from" state in the location (see requireAuth), use it; otherwise, default to "/"
    const from = location.state?.from?.pathname || "/"; 

    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

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
        // console.log(user, pwd);
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}), {
                    headers: {'Content-Type':'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
        setPwd('');
        // setSuccess(true);
        navigate(from, {replace: true}); // on success ful login navigate to the original location "from" where the user came to login
            
        } catch (error) { // what can go wrong?
            if(!error?.response) {
                setErrMsg('No Server Response');
            } else if(error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if(error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus(); // set focus to error message
        }        
    }

    return (
        // <>
        // {
        //     success ? (
        //         <section>
        //             <h1>Sucssefully Logged in!</h1>
        //             <br />
        //             <p>
        //                 <a href="#">Go to home</a>
        //             </p>
        //         </section>
        //     ) : (
        
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
        //     )}
        // </>
    )
}

export default Login