import React , {useState, useEffect} from 'react'
import axios from 'axios';
import Loader from '../Loader';
import Error from '../Error';

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/getallusers");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="row">
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Administrator Access</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users