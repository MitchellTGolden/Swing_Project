import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from '@reach/router';
import NavBar from '../components/NavBar';
import { useCombobox } from 'downshift';

const Games = props => {

    const [games, setGames] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [player, setPlayer] = useState([]);
    const [inputItems, setInputItem] = useState([]);
    const [singleGame, setSingleGame] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:8000/games',{withCredentials:true})
            .then(res => {
                setGames(res.data.results)
                console.log(res.data.results)
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
    

    //Search fx
    const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
        items: inputItems,
        onInputValueChange: ({ inputValue }) => {
            setInputItem(
                games.filter((game) => game.name.toLowerCase().startsWith(inputValue.toLowerCase())
                )
            )
        }
    })
    //fx ends

    return (
        <div>
            <NavBar />
            
            {/* Search */}
            <div {...getComboboxProps()} >
                <input className="m-3" {...getInputProps()}
                    placeholder="Search"
                    enterbutton="Search"
                    size="large"
                />
            </div>
            <ul {...getMenuProps()} className="row">
                {isOpen &&
                    inputItems.map((game, index) => (
                        <span key={index.id} {...getItemProps({ game, index })}>
                            
                            <li>

                            <div>
                                    <div className="card p-2 m-3" style={{ height: 300, width: 350 }}> 
                                    <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item" >
                                            <Link className="nav-link active" to={`/addptog/${game._id}`}>Join</Link>
                                        </li>
                                        <li className="nav-link">
                                            <div className="btn-group dropright">
                                                <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Players</button>
                                                <div className="dropdown-menu text-center">
                                                    <div>
                                                        {game.player1.user ?
                                                            <p>{game.player1.user.firstName} {game.player1.user.lastName}</p>
                                                            :
                                                            "No Players at this time"}

                                                        {game.player2.user &&
                                                            <p>{game.player2.user.firstName} {game.player2.user.lastName}</p>
                                                        }
                                                        {game.player3.user &&
                                                            <p>{game.player3.user.firstName} {game.player3.user.lastName}</p>
                                                        }
                                                        {game.player4.user &&
                                                            <p>{game.player4.user.firstName} {game.player4.user.lastName}</p>
                                                        }
                                                        {game.player5.user &&
                                                            <p>{game.player5.user.firstName} {game.player5.user.lastName}</p>
                                                        }
                                                        {game.player6.user &&
                                                            <p>{game.player6.user.firstName} {game.player6.user.lastName}</p>
                                                        }
                                                        {game.player7.user &&
                                                            <p>{game.player7.user.firstName} {game.player7.user.lastName}</p>
                                                        }
                                                        {game.player8.user &&
                                                            <p>{game.player8.user.firstName} {game.player8.user.lastName}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                    <div className="card-body">
                                        <h3 className="card-title">{game.name}</h3>
                                        <p>Location: {game.location}</p>
                                        {game.completed ? <Link className="btn btn-danger" to={`/game/${game._id}`}>View Results</Link> : <Link className="btn btn-primary" to={`/game/${game._id}`}>View Game</Link> 
                    }
                                    </div>

                                </div>
                            </div>


                            </li>
                        </span>
                    ))
                }
            </ul>
            {/* Search ends */}
{/* 
            <div className="card p-2 m-3" style={{ height: 250, width: 350 }}>  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item" >
                            <Link className="nav-link active" to={`/addptog/${singleGame._id}`}>Join</Link>
                        </li>
                        <li className="nav-link">
                            <div className="btn-group dropright">
                                <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Players</button>
                                <div className="dropdown-menu text-center">
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                    <div className="card-body">
                        <h3 className="card-title">{singleGame.name}</h3>
                        <p>Location: {singleGame.location}</p>
                        <Link className="btn btn-primary" to={`/game/${singleGame._id}`}>View Game</Link>
                    </div>

                </div> */}

            <div>
            <div className="row d-flex justify-content m-5">

                {
                    loaded &&
                    games.map((game, i) => {
                        return <div key={i}>
                            <div className="card p-2 m-3" style={{height:300, width:350}}>  <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item" >
                                        <Link className="nav-link active" to={`/addptog/${game._id}`}>Join</Link>
                                    </li>
                                    <li className="nav-link">
                                    <div className="btn-group dropright">
                                            <button type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Players</button>
                                            <div className="dropdown-menu text-center">
                                                <div>
                                                    {game.player1.user ?
                                                        <p>{game.player1.user.firstName} {game.player1.user.lastName}</p>
                                                    :
                                                    "No Players at this time"}

                                                    {game.player2.user &&
                                                        <p>{game.player2.user.firstName} {game.player2.user.lastName}</p>
                                                    }
                                                    {game.player3.user &&
                                                        <p>{game.player3.user.firstName} {game.player3.user.lastName}</p>
                                                    }
                                                    {game.player4.user &&
                                                        <p>{game.player4.user.firstName} {game.player4.user.lastName}</p>
                                                    }
                                                    {game.player5.user &&
                                                        <p>{game.player5.user.firstName} {game.player5.user.lastName}</p>
                                                    }
                                                    {game.player6.user &&
                                                        <p>{game.player6.user.firstName} {game.player6.user.lastName}</p>
                                                    }
                                                    {game.player7.user &&
                                                        <p>{game.player7.user.firstName} {game.player7.user.lastName}</p>
                                                    }
                                                    {game.player8.user &&
                                                        <p>{game.player8.user.firstName} {game.player8.user.lastName}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                                <div className="card-body">
                                    <h3 className="card-title">{game.name}</h3>
                                    <p>Location: {game.location}</p>
                                    {game.completed ? <p>Match is over</p>: <p>Match is in progress...</p>}
                                    {game.completed ? <Link className="btn btn-danger" to={`/game/${game._id}`}>View Results</Link> : <Link className="btn btn-primary" to={`/game/${game._id}`}>View Game</Link> 
                    } 
                                </div>
                            </div>
                            </div>


                            


                    })
                }

            </div>
        </div>
    </div>
    );

}


export default Games;