import Axios from 'axios';
import { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import NavBar from '../components/NavBar';

const User = props => {

    const [deleted, setDeleted] = useState(false);
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
        Axios.get(`http://localhost:8000/swing/user/${props.id}`)
            .then(res => {
                setUserForm(res.data.results)
                console.log(res.data.results)
            })
            .catch(err => console.log(err))
    }, [props])

    function deleteUser(user_id) {
        if (window.confirm("Are you sure you want to delete your account?")) {
            Axios.delete(`http://localhost:8000/swing/user/delete/${user_id}`)
                .then(res => {
                    if (res.data.results) {
                        console.log("User deleted!")
                        setDeleted(!deleted);
                        navigate('/')
                        alert("User has been deleted")
                    }
                })
                .catch(err => console.log(err))
            return true;
        }
        return false;
    }

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
        <>
            <div>
                <div>
                    <NavBar />
                </div>
            </div>

            <div className="d-flex justify-content-around p-5">
                <form className="col-4" onSubmit={handleUpdate}>
                    <h2 className="text-center m-5">Edit {userForm.firstName}:</h2>
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
                    </div>

                    <input type="submit" value="Save" className="btn btn-primary mr-2" />
                    <button type="button" className="btn btn-primary ml-2" onClick={() => deleteUser(props.id)}>Delete</button>
                </form>
            </div>


        </>
    );
}

export default User;