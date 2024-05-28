import axios from "../api/axios"
import useAuth from "./useAuth"

// once our token expires get a new one and retry the request
const useRefreshToken = () => {
    const {setAuth} = useAuth(); // to access authentication context and using the setAuth function from AuthProvider to update the authentication state

    const refresh = async () => {   // why is this an async function
        // refresh token
        const response = await axios.get('/refresh', { // refresh is a secure endpoint
            withCredentials: true // for sending a secure cookie that has the response token with requests the API uses cookies to manage sessions
            // For the server to recognize the user’s session during a request to refresh the token, the cookie must be included in the request.

        });
        // prev is the current state of auth before the update.
        setAuth(prev => { // updates the authentication state // the 1st arg/element returned by useState hook is the current state (prev)
            console.log(JSON.stringify(prev))
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}    // creates a new object by spreading the properties of prevState and overriding the accessToken property with the new value obtained from the API response
        })
        return response.data.accessToken; // return the new access token
    }

    return refresh; // return for use in other comps or hooks where they need to validate a token availability
};

export default useRefreshToken

/**
 * API Request: An HTTP GET request is sent to the /refresh endpoint, including credentials (such as cookies).
 *              The response is expected to contain a new access token.
 * 
 *           The authentication state is updated with the new access token (returned immediately for use) using the setAuth function.
 * 
 * For example, it might be called when an API request fails due to an expired token, to refresh the token and retry the request.
 * User Logs In:

The user provides their credentials (username and password).
The server validates the credentials and sets a cookie in the user’s browser. This cookie often contains a session identifier or other token used for subsequent requests.
Token Expiry and Refresh:

As the user interacts with the application, their access token might expire.
To obtain a new access token without forcing the user to log in again, the application makes a request to the /refresh endpoint.
Including the Cookie:

The server expects the authentication cookie to be included in the request to /refresh.
By setting withCredentials: true, you ensure that the cookie is sent with the request, allowing the server to authenticate the session and issue a new access token.
 * 
 */