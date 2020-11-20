import React,{useState,useEffect} from 'react';
import{ navigate } from '@reach/router'
import Axios from 'axios'
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const ChatNoSocket = props => {
    const [input,setInput] = useState("");
    const [loggedInUser,setLoggedInUser] = useState([]);
    const [users, setUsers] = useState([])
    const [playerForm, setPlayerForm] = useState([])
    const [messages, setNewMessage] = useState("")

    const handlePlayerInput = e => {
        setPlayerForm({
            ...playerForm,
            _id :e.target.value
            
        })
        console.log(playerForm)
    }

    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/user/${props.id}`)
            .then(res => {
                setLoggedInUser(res.data.results)
                console.log(res.data.results)
                Axios.get('http://localhost:8000/users')
                    .then(res => {
                    setUsers(res.data.results)
                })
            })
            .catch(err => console.log(err))
    }, [props])

const sendToX = e => {
    e.preventDefault();
    console.log(playerForm._id)
    console.log(messages)
    Axios.post(`http://localhost:8000/swing/message/${playerForm._id}`, {messages})
        .then(data=>{
            console.log(data)
            navigate(`/message/${props.id}`)
            })
    }
return (
    <div>
    <NavBar />
    <div className="col-8 mx-auto">
        <div className="form-group">
        <form onSubmit={sendToX}>
        <label>{loggedInUser.firstName} who would you like to message?</label>

            <select value={playerForm._id} onChange={handlePlayerInput}className="m-3 p-1">
                <option>Choose a Player</option>
                    {users.map((user,i) => {
                return <option key={i}
                    value={user._id} >
                    {user.firstName} {user.lastName}
                    </option>
                })
            }
            </select>

        <input 
            type="text" 
            value={messages} 
            onChange={(e) => setNewMessage(e.target.value)} 
            className="form-control"
        />
        <input type="submit" value="Send" className="btn btn-secondary"/>
        </form>
        </div>


        <ul className="list-group">
        {
            // messages.map((m,i) => <li key={i} className="list-group-item">{m}</li>)
        }
        </ul>
    </div>
    </div>
        );
}

export default ChatNoSocket;
