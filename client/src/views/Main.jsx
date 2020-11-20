import { useState,useEffect } from "react";
import Axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar';
import Mapp from '../components/Map'



const Main = props => {

    const [users,setUsers] = useState([]);
    const [loggedIn,setLoggedIn] = useState( JSON.parse(localStorage.getItem("user")) || {firstName:"YOU",lastName:"BROKE", _id : "IT"})
    useEffect(() => {
        
        Axios.get("http://localhost:8000/api/users",{withCredentials:true})
            .then(res => setUsers(res.data.results))
            .catch(err => {
                if(err.response.status === 401){
                    navigate('/');
                }
            })
    })  

    return(
        <div>
            <NavBar loggedIn={loggedIn}/>
            <div className="jumbotron">
                <h1 className="display-3">Hello, {loggedIn.firstName}</h1>
            </div>

        <Mapp/>
        </div>

    );

}


export default Main;