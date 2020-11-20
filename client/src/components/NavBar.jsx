import Axios from 'axios';
import { useState } from 'react';
import { Link, navigate } from '@reach/router';

const NavBar = props => {

    const [users, setUsers] = useState([])
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")) || { firstName: "YOU", lastName: "BROKE", _id: "IT" })


    const logout = () => {
        Axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                navigate('/')
                localStorage.clear();
                
            })
            .then(
                Axios.get('http://localhost:8000/users')
                    .then(res => {
                        setUsers(res.data.results)
                    })
                    .catch(err => console.log(err)))
            .catch(err => console.log(err));
    }

    return (
<div>   
    <nav className="navbar navbar-expand-lg p-3 navbar-dark rounded bg-dark">
            <Link to="/dashboard" className="nav-link">Room 42</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
            <Link to="/newgame" className="nav-link">Create Game</Link>
            </li>
            <li className="nav-item active">
            <Link to="/games" className="nav-link">View Games</Link>
            </li>
            <li className="nav-item active">
            <Link to={`/chat/${loggedIn._id}`} className="nav-link" >Chat</Link>
            </li>
            <li className="nav-item active">
            <Link to={`/message/${loggedIn._id}`} className="nav-link">New Message</Link>
            </li>
            {loggedIn ?
                    <li className="nav-item active">
                        <Link to={`/user/${loggedIn._id}`} className="nav-link">Account</Link>
                    </li>
                    :
                ""
            }
                                <li className="nav-item active">
                        <Link to={`/mymessages/${loggedIn._id}`} className="nav-link">My Messages</Link>
                    </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <button onClick={logout} className="btn btn-primary">Logout</button>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <div className="gcse-searchbox"></div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
    </div> 
    )
}

export default NavBar;