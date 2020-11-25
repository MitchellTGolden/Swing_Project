import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import NavBar from '../components/NavBar'

const AddPlayers = props => {
    const [playerForm, setPlayerForm] = useState({})
    const[player, setPlayer] = useState([])
    const [games, setGames] = useState([])
    const [playerNum, setPlayerNum] = useState(1)
    const [loaded,setLoaded] = useState(false);
    const [loadedAgain, setLoadedAgain] = useState(false)
    
    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/game/${props.gameId}`,{withCredentials:true})
            .then(res => {
                console.log(res.data.results)
                setGames(res.data.results)
                setLoaded(true);
            })
            .then(
                Axios.get('http://localhost:8000/users')
                .then(res => {
                setPlayer(res.data.results)
                })
                .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }, [props])

    const handlePlayerSumbit = e => {
        e.preventDefault();
        console.log(`Player Form Value : ${playerForm._id}`)
        Axios.get(`http://localhost:8000/swing/addptog/${playerForm._id}/${props.gameId}/player`+playerNum.playerNum)
            .then(res => {
                console.log(res)
                setLoaded(!loaded)
                setLoadedAgain(!loadedAgain)
                    
            })
            .then(res => {
                setLoaded(true)
                navigate(`/addptog/${props.gameId}`)
                })

            // .then(setPlayerNum(playerNum.playerNum + 1))
            .catch(err => console.log(err)) 
    }

    const handlePlayerInput = e => {
        setPlayerForm({
            ...playerForm,
            _id :e.target.value
            
        })
        console.log(playerForm)
    }
    const handlePlayerNumInput = e => {
        setPlayerNum({
            playerNum :e.target.value
            
        })
    } 

    return (
        <div>
            <NavBar/>

            <div className="jumbotron">
                <h1 className="display-3">{games.name}</h1>
                <p className="lead">{games.location}</p>
            </div>
            
            <form onSubmit={handlePlayerSumbit}>
            <select value={playerForm._id} onChange={handlePlayerInput}className="m-3 p-1">
                <option>Choose a Player</option>
            {player.map((user,i) => {
                return <option key={i}
                    value={user._id} >
                    {user.firstName} {user.lastName}
                    </option>
                })
            }
            </select>
            {/* {player.firstName}
                input */}
                <select value={playerNum.playerNum} onChange={handlePlayerNumInput} className="m-3 p-1">
                <option >Player #</option>
                <option value={1}>Player 1</option>
                <option value={2}>Player 2</option>
                <option value={3}>Player 3</option>
                <option value={4}>Player 4</option>
                <option value={5}>Player 5</option>
                <option value={6}>Player 6</option>
                <option value={7}>Player 7</option>
                <option value={8}>Player 8</option>
                </select>
            <input type="submit" className="btn btn-primary " value="Add Player"></input> 
            <Link className="btn btn-primary ml-3" to={`/game/${games._id}`}>Back</Link>
            </form>
            {loaded || loadedAgain ? 
        
                <table className='m-4 mx-auto rounded table table-striped align-center col-4 text-center'>
        <thead>
            <tr>
                <th rowSpan="2">Player #</th>
                <th rowSpan="2">Name</th>
            </tr>
        </thead>
        <tbody>
            {games.player1.user &&
                <tr>
                    <td>
                        1
        </td>
                    <td>
                        <p>{games.player1.user.firstName} {games.player1.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player2.user &&
                <tr>
                    <td>
                        2
        </td>
                    <td>
                        <p>{games.player2.user.firstName} {games.player2.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player3.user &&
                <tr>
                    <td>
                        3
        </td>
                    <td>
                        <p>{games.player3.user.firstName} {games.player3.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player4.user &&
                <tr>
                    <td>
                        4
        </td>
                    <td>
                        <p>{games.player4.user.firstName} {games.player4.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player5.user &&
                <tr>
                    <td>
                        5
        </td>
                    <td>
                        <p>{games.player5.user.firstName} {games.player5.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player6.user &&
                <tr>
                    <td>
                        6
        </td>
                    <td>
                        <p>{games.player6.user.firstName} {games.player6.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player7.user &&
                <tr>
                    <td>
                        7
        </td>
                    <td>
                        <p>{games.player7.user.firstName} {games.player7.user.lastName}</p>
                    </td>
                </tr>
            }
            {games.player8.user &&
                <tr>
                    <td>
                        8
        </td>
                    <td>
                        <p>{games.player8.user.firstName} {games.player8.user.lastName}</p>
                    </td>
                </tr>
            }
                </tbody>
            </table>
            
            : ""}
            
            
        </div>
        
    )
    
}
        
export default AddPlayers;