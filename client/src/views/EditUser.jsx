import { useState, useEffect } from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar'

const Edit = props => {
    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    })

    useEffect(() => {
        Axios.get(`http://localhost:8000/swing/user/${props.id}`, { withCredentials: true })
            .then(res => {
                setUserForm(res.data.results)
                // setLoaded(true)
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate('/');
                }
            })
    }, [props])

    const handleForm = e => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        Axios.put(`http://localhost:8000/swing/user/update/${props.id}`, userForm)
            .then(res => {
                console.log(res);
                if (res.data.results) {
                    navigate(`/dashboard`)
                    alert('User updated.')
                } else {
                    setErrors(res.data);
                }
            })
    }

    return (
        <div>
            <NavBar />
            <div className="d-flex justify-content-around p-5">
                <form className="col-4" onSubmit={handleUpdate}>
                <h2 className="text-center m-5">Edit Information:</h2>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            onChange={handleForm}
                            value={userForm.firstName}
                        />
                        <span className="text-danger">{errors.firstName ? errors.firstName.message : ""}</span>
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={handleForm}
                            value={userForm.lastName}
                        />
                        <span className="text-danger">{errors.lastName ? errors.lastName.message : ""}</span>
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            readOnly
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleForm}
                            value={userForm.email}
                        />
                        {/* <span className="text-danger">{errors.email ? errors.email.message : ""}</span> */}
                    </div>

                    <input type="submit" value="Save" className="btn btn-primary" />
                </form>
            </div>
        </div>
    )
}

export default Edit;