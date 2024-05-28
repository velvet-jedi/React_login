import {useState, useEffect} from 'react';
// import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import {useNavigate, useLocation} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();

    const axiosPrivate = useAxiosPrivate();

    // handle auto logout
    const navigate = useNavigate();
    const location = useLocation();    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {  // fetch from /users endpoint
            try{
                // const response = await axios.get('/users', {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                })
                console.log(response.data);
                isMounted && setUsers(response.data); // u[pdate the usre state with the response data]
            } catch (err) {
                console.error(err);
                // head back to login, with current location as state, when needed to reauthenticate on token expiry
                navigate('/login', {state: {from: location}, replace: true}); // pass the current location, after successful login redirect to that place, by placing it into the history stack
            }
        }
        getUsers();

// cleanup function
        return () => {
            isMounted = false;
            controller.abort(); //  aborts the ongoing request to avoid memory leaks.
        }

    },[])


    return (
        <article>
            <h2>Users List</h2>
            {
                users?.length // users array
                ? (
                    <ul>
                        {
                            users.map((user, i) => 
                            <li key={i}>{user?.username}</li>
                        )}
                    </ul>
                ) :
                    <p>No Users to display</p>
                
            }
        </article>
    )
};

export default Users