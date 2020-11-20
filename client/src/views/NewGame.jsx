import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import NavBar from '../components/NavBar'

const NewGame = props => {

    const [gameForm, setGameForm] = useState({
        name: "",
        location : ""
    })

    const [errors, setErrors] = useState({})


    const handleRegInputs = e => {
        setGameForm({
            ...gameForm,
            [e.target.name]: e.target.value
        })
    }

    const handleNewGame = e => {
        
        e.preventDefault();
        Axios.post('http://localhost:8000/swing/game/create', gameForm)
            .then(res => {
                console.log(res.data.results);
                if (res.data.results) {
                    navigate('/games');
                } else {
                    setErrors(res.data);
                }
            })
    }

    return (
        <div>
            <NavBar />
            <div className="d-flex justify-content-around p-5" >
                <form className="col-4" onSubmit={handleNewGame}>
                    <h2 className="text-center">Add A Game:</h2>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleRegInputs}
                            value={gameForm.name}
                        />
                        <span className="text-danger">{errors.name ? errors.name.message : ""}</span>
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            onChange={handleRegInputs}
                            value={gameForm.location}
                        />
                        <span className="text-danger">{errors.location ? errors.location.message : ""}</span>
                    </div>
                    <input type="submit" value="Create" className="btn btn-primary" />
                </form>
            </div>
        </div>
        
    )
}

export default NewGame;