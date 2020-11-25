import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import NavBar from '../components/NavBar';
import Score from '../components/Score';

const Game = props => {
    const initialScore = {
        player1: "",
        player2: "",
        player3: "",
        player4: "",
        player5: "",
        player6: "",
        player7: "",
        player8: "",
    }
    const [games, setGames] = useState({})
    const [loaded,setLoaded] = useState(false);
    const [holeNum, setHoleNum] = useState(1);
    const [playerScore, setPlayerScore] = useState(initialScore)


    
    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/game/${props.gameId}`,{withCredentials:true})
            .then(res => {
                console.log(res.data.results)
                setGames(res.data.results)
                setLoaded(true);
            })
    }, [props])

    const handleFinalSave = e =>{
        e.preventDefault();
        // setGames({...games, [games.completed] : true}) 
        Axios.put(`http://localhost:8000/swing/game/update/${props.gameId}`, games)
            .then(res => {
                console.log(res.data.results)
            })
    }


    const players = ["player1","player2","player3","player4","player5","player6","player7","player8"]
    const handleScoreSubmit = (e) =>{
        e.preventDefault();
        let games2 = games
        for(let player of players){
            games2 = 
                {...games2, [player] : {...games[player], scores : [...games[player].scores, Number(playerScore[player])]}}    
                }  
    setGames(games2)
    setHoleNum(holeNum + 1)   
    }

    const handleScoreInput = e => {
        setPlayerScore({
            ...playerScore,
            [e.target.name] : e.target.value
            
        })
        console.log(playerScore)
    }

    return (
        <div>
            <NavBar/>
            <div className="jumbotron">
                <h1 className="display-3">{games.name}</h1>
                <p className="lead">{games.location}</p>
                <Link className="btn btn-primary" to={`/addptog/${props.gameId}`}>Add Players to this game</Link><br></br>

            </div>
        {loaded && games.player1.scores.length !== 18 ? 
        
        loaded && 
    <div className="d-flex justify-content-around">
        <form onSubmit={handleScoreSubmit} className="form-group m-5">
    <h1>Hole {holeNum}</h1> <br></br>
    <div className="row">
            {games.player1.user? <div>
                <label>{games.player1.user.firstName}</label>
            <input
                type="number" 
                name="player1"
                style={{width:42}}

                onChange={handleScoreInput}
                className="m-2"
                value={playerScore.player1}
            />
            </div>
            : 
            ""}<br></br>

            {games.player2.user? <div>
                <label>{games.player2.user.firstName}</label>
            <input
                type="number" 
                name="player2"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player2}
            />
            </div>
            : 
            ""}<br></br>
            {games.player3.user? <div>
                <label>{games.player3.user.firstName}</label>
            <input
                type="number" 
                name="player3"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player3}
            />
            </div>
            : 
            ""}<br></br>
            
            {games.player4.user? <div>
                <label>{games.player4.user.firstName}</label>
            <input
                type="number" 
                name="player4"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player4}
            />
            </div>
            : 
            ""}<br></br>
                {games.player5.user? <div>
                <label>{games.player5.user.firstName}</label>
            <input
                type="number" 
                name="player5"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player5}
            />
            </div>
            : 
            ""}<br></br>
            
            {games.player6.user? <div>
                <label>{games.player6.user.firstName}</label>
            <input
                type="number" 
                name="player6"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player6}
            />
            </div>
            : 
            ""}<br></br>
            
            {games.player7.user? <div>
                <label>{games.player7.user.firstName}</label>
            <input
                type="number" 
                name="player7"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player7}
            />
            </div>
            : 
            ""}<br></br>
            
            {games.player8.user? <div>
                <label>{games.player8.user.firstName}</label>
            <input
                type="number" 
                name="player8"
                className="m-2"
                style={{width:60}}
                onChange={handleScoreInput}
                value={playerScore.player8}
            />
            </div>
            
            : 
            ""}<br></br>
            </div>
            <input type="submit" className="btn btn-success" value="Next Hole"/>
        </form>
    </div>
    

        : 
        loaded &&
                <div>
                    <h3>Match Completed!</h3>
                    <button className="btn-danger" onClick={handleFinalSave}> Save Game </button>

                </div>
        }
        
        
        {loaded && 
                <div>
                    <table className='m-4 table table-bordered bg-light text-center'>
                        <thead>
                            <tr>
                                <th rowSpan="2">Player #</th>
                                <th rowSpan="2">Name</th>
                                <th colSpan="18" >Hole Number</th>
                                <th rowSpan="2">Final Score</th>
                            </tr> 
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>9</td>
                                    <td>10</td>
                                    <td>11</td>
                                    <td>12</td>
                                    <td>13</td>
                                    <td>14</td>
                                    <td>15</td>
                                    <td>16</td>
                                    <td>17</td>
                                    <td>18</td>
                                </tr>
                        </thead>
                        <tbody>
                    {games.player1.user && 
                        <Score 
                            player={games.player1}
                            num={1}
                            total={games.player1.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player2.user &&                        
                        <Score 
                            player={games.player2}
                            num={2}
                            total={games.player2.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player3.user &&                        
                        <Score 
                            player={games.player3}
                            num={3}
                            total={games.player3.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player4.user &&                        
                        <Score 
                            player={games.player4}
                            num={4}
                            total={games.player4.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player5.user &&                        
                        <Score 
                            player={games.player5}
                            num={5}
                            total={games.player5.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player6.user &&                        
                        <Score 
                            player={games.player6}
                            num={6}
                            total={games.player6.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player7.user &&                        
                        <Score 
                            player={games.player7}
                            num={7}
                            total={games.player7.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    {games.player8.user &&                        
                        <Score 
                            player={games.player8}
                            num={8}
                            total={games.player8.scores.reduce((a,b) => a+b,0)}
                        />
                    }
                    </tbody>
                    </table>
                </div>
            }
            <div className="d-flex justify-content-around p-5">
                
                { loaded && 
                <ul className="list-group">
                {games.messages.map((m,i) => {
            return (
                <li className="list-group-item" key={i}>
                {m.messages}
                </li>
        )})
            
        }
        </ul>
        }
        {/* <li>{user.messages.messages}</li> */}
        

        </div>
            </div>

    )}

export default Game;