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
            finally {
                setIsLoading(false);    // to prevent an endless loop on rerenders and state changes
            }
        }
    }, [])
}