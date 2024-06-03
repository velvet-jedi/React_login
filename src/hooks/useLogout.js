import axios from "../api/axios"
import useAuth from "./useAuth"

const useLogout = () => {
    const {setAuth} = useAuth(); // grab the auth state function

    const logout = async () => {    // return this function to be used mutiple places
        setAuth({}); // empty tthe auth state object
        try {
            const response = await axios('/logout', {
                withCredentials: true   // ensure that the session cookie is sent with the logout request to the logout endpoint
            })
        } catch (error) {
            console.log(error)
        }
    }
    return logout;
}

export default useLogout