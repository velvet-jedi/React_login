import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // on every state change, set the focusof the input
    useEffect(() => {
      userRef.current.focus();
    }, [])

    // on every state change, validate the username
    useEffect(() => {
      const result = USER_REGEX.test(user); // set the match result
      console.log(result);
      console.log(user);
      setValidName(result);
    }, [user]) // user state in the dependency array


    useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
    }, [pwd, matchPwd])


    useEffect(() => {
      setErrMsg('');  // blank the  error message while user changes any input state 
    }, [user, pwd, matchPwd])

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
      aria-live="assertive">{errMsg}</p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </span>
        </label>
        <input 
          type="text" id='username' 
          ref= {userRef} // to set focus on the input line 32
          autoComplete='off' // to disable previous autofilling
          onChange={(e) => setUser(e.target.value)} // tie the onchange event with setting the state 
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote" // another element to give the description of the input field
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />      

          {/* show the input instructions only when focus is on the input and user state has some value which is also invalid   */}
          <p id='uidnote' className={userFocus && user && 
            !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </span>
        </label>
        <input 
          type="password" id='password' 
          // ref= {userRef} // to set focus on the input line 32  
          onChange={(e) => setPwd(e.target.value)} // tie the onchange event with setting the state 
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote" // another element to give the description of the input field
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          />      

          {/* show the input instructions only when focus is on the input and user state has some value which is also invalid   */}
          <p id='pwdnote' className={pwdFocus &&
            !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: 
            <span aria-label="exclamation mark">!</span> 
            <span aria-label="at symbol">@</span> 
            <span aria-label="hashtag">#</span> 
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </span>
        </label>
        <input 
          type="password" id='confirm_pwd' 
          // ref= {userRef} // to set focus on the input line 32  
          onChange={(e) => setMatchPwd(e.target.value)} // tie the onchange event with setting the state 
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote" // another element to give the description of the input field
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />      

          {/* show the input instructions only when focus is on the input and user state has some value which is also invalid   */}
          <p id='confirmnote' className={matchFocus &&
            !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password.<br />  
          </p>
          


      </form>
      
    </section>
  )
}

export default Register