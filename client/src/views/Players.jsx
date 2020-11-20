import {useState,useEffect} from "react";
import Axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBar from '../components/NavBar'

const Players = props => {

    const [users,setUsers] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8000/users' )
            .catch(err => {
            if(err.response.status === 401){
                navigate('/');
            }
        })
            .then(res => {
                setUsers(res.data.results)
            })

            .catch(err => console.log(err))
    }, [])


    return(
        <div>
            <NavBar />
            <div>
            <div className="d-flex justify-content-between m-3">

            
            </div>
            {
                users.map((user,i) => {
                    return <p key={i}>
                        <Link to={`/user/${user._id}`}>{user.firstName}</Link>
                        
                        </p>
                })
            }
        </div>
        </div>
    );

}


export default Players;