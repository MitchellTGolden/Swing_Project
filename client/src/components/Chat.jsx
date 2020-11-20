import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar'
import Axios from 'axios'
import {navigate} from '@reach/router'

const Chat = props => {
    const [socket] = useState(() => io(":8000"));
    const [input,setInput] = useState("");
    const [messages, setMessages] = useState([])
    const [loggedInUser, setLoggedInUser] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/user/${props.id}`)
            .then(res => {
                setLoggedInUser(res.data.results)
                console.log(res.data.results)
            })
            .catch(err => console.log(err))
    }, [props])
useEffect(() => {
    socket.on("Welcome", data => console.log(data));
    socket.on("joined", data => console.log(data));
    socket.on("sent", data => console.log(data));

    socket.on("updatingMessages", data => setMessages(data));
    setLoaded(true)
    return () => socket.disconnect(true);
    },[socket])

const sendToServer = () => {
    socket.emit("addToChat",`${loggedInUser.firstName} says: ${input}`);
    setInput("");
    }

return (
    <div>
        <NavBar/>
    
    <div className="App col-4 mx-auto">
    <div className="form-group">
    <label className="m-4">{loggedInUser.firstName} Send a message:</label>
    <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className="form-control"
    />
    </div>
    <button  onClick={sendToServer} className="btn btn-success">Send</button>


    <ul className="list-group">
    {
        messages.map((m,i) => <li key={i} className="list-group-item">{m}</li>)
    }
    </ul>
</div>
    
    </div>
        );
}

export default Chat;
