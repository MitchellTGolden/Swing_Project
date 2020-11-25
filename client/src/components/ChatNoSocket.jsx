import React,{useState,useEffect} from 'react';
import{ navigate } from '@reach/router'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const ChatNoSocket = props => {
    const [loggedInUser,setLoggedInUser] = useState([]);
    const [users, setUsers] = useState([])
    const [playerForm, setPlayerForm] = useState([])
    const [gameForm, setGameForm] = useState([])

    const [messages, setNewMessage] = useState("")
    const [games, setGames] = useState([])

    const handlePlayerInput = e => {
        setPlayerForm({
            ...playerForm,
            _id :e.target.value
            
        })
        console.log(playerForm)
    }
    const handleGameInput = e => {
        setGameForm({
            ...gameForm,
            _id :e.target.value
            
        })
        console.log(gameForm)
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
                Axios.get('http://localhost:8000/games')
                    .then(res => {
                        setGames(res.data.results)
                    })
            })
            .catch(err => console.log(err))
    }, [props])
// const addPlayerNameToMessage = e => {
//     e.preventDefault();
//     console.log(messages)
//     setUpdated(!updated)
//     setNewMessage(`${loggedInUser.firstName} says: ${messages}`)
//     setUpdated(!updated)
//     console.log(messages)
//     sendToX(messages)
// }

const sendToX = e => {
    if (window.confirm("Are you sure you want to send a message")) {
    Axios.post(`http://localhost:8000/swing/message/${playerForm._id}`, {messages : loggedInUser.firstName + " " + loggedInUser.lastName  + ": " + messages })
        .then(res=>{
            if (res.data.results) {
            console.log(res)
            navigate(`/message/${props.id}`)
            alert("Message has been sent")    
        }
    })
    .catch(err => console.log(err))
        return true;
    }
    return false;
}
    
const sendToGame = e => {
        e.preventDefault();
        Axios.post(`http://localhost:8000/swing/message/game/${gameForm._id}`, {messages : loggedInUser.firstName + " " + loggedInUser.lastName  + ": " + messages })
            .then(data=>{
                console.log(data)
                navigate(`/game/${gameForm._id}`)
                })
            .catch(err => console.log(err))
        }



return (
    <div>
    <NavBar />
    <div className="row">
    <div className="col-5 mx-auto">
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
        <input type="submit" value="Send" className="m-4 btn btn-success"/>
        </form>
    </div>
    </div>
        <div className="col-5 mx-auto">
        <div className="form-group">
        <form onSubmit={sendToGame}>
        <label>Or send a message directly to a game</label>

            <select value={gameForm._id} onChange={handleGameInput}className="m-3 p-1">
                <option>Choose a game</option>
                    {games.map((game,i) => {
                return <option key={i}
                    value={game._id} >
                    {game.name}
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
        <input type="submit" value="Send" className="m-4 btn btn-success"/>
        </form>
        </div>


        <ul className="list-group">
        {
            // messages.map((m,i) => <li key={i} className="list-group-item">{m}</li>)
        }
        </ul>
    </div>
    </div>
    </div>
        );
}

export default ChatNoSocket;
