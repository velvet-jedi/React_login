// This custom hook is designed to return an axiosPrivate instance that can automatically handle token refreshes if the token is expired during API requests.

import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    // to setup reqeust and response interceptors
    useEffect(() => {
        // an interceptor is like an event listener, adding more will result in a mess
        // we shall start in a reverse order with response intercceptorfirst
        

        // to handle responses and refresh the token if a 403 error occurs (indicating an expired or invalid token)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            // config is the request configuration object that can be modified before the request is sent
            config => {
                // first attempt to get the access token
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error) // Purpose: To propagate the error further down the promise chain.
        );


        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, // return response if true
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;    //  prevents an infinite loop of retries if the token refresh fails or the new token is also invalid.
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        )
        // cleanup function to remove the interceptor associated with the response of the axiosPrivate instance request
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.response.eject(requestIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;