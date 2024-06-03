import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true); // loading indicator
    const refresh = useRefreshToken();
    const {auth, setAuth} = useAuth(); // grab the current auth
    
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh(); // reach out for cookie and send us back an access token
                                    //  the token is needed before the requireAuth as it will kick us back out
            } catch (error) {
                console.log(error);
            }
            finally { // the finally block runs regardless of whether an error occurs or not
                setIsLoading(false);    // to prevent an endless loop of same effect again and again on rerenders and state changes
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false); // run this function only if the accessToken is not present

    }, [])

    useEffect(() => {   
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading} ?
                <p>Loading...</p>
                 : <Outlet/> {/*represents children of the PersistLogin route/component */} 
        </>
    )

}


export default PersistLogin