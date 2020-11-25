import Axios from 'axios';
import { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar';

const User = props => {

    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)



    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/user/${props.id}`)
            .then(res => {
                setUser(res.data.results)
                console.log(res.data.results)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [props])


    return (
        <>
            <div>
                    <NavBar />
            </div>

            <div className="d-flex justify-content-around p-5">
                
                    { loaded && 
                    <ul className="list-group"> 
                    <h3>Messages</h3>
                    {user.messages.map((m,i) => {
                return (
                    <li key={i} className="list-group-item">
                    {m.messages}
                    </li>
            )})
                
            }
            </ul>
            }
            {/* <li>{user.messages.messages}</li> */}
            

            </div>


        </>
    );
}

export default User;