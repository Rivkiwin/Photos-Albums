import { updateProfile, UserCredential } from 'firebase/auth';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { auth } from '../../services/config/fireBase';
import AlertPop from '../Alert';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';

function Register() {

    const { authService } = useService();
    const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = ({ target }: any) => {
        setUser({ ...user, [target.name]: target.value })
    }

    const handleChangeSubmit = (event: any) => {
        event.preventDefault();
        authService.register(user).then(res => {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: user.name,
                }).then((res) => {
                    history.replace('/albums/');
                })
            }
        })
    };

    return (
        <>
            <div className="row justify-content-center mt-5">
                <Card border="dark d-flex justify-content-center col-4 p-3">
                    <form>
                        <h3>Sign Up</h3>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                required
                                onChange={handleChange}
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                required
                                onChange={handleChange}
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                onChange={handleChange}
                                required
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid">
                            <button onClick={handleChangeSubmit} className="btn btn-secondary">
                                Submit
                            </button>
                        </div>
                    </form>
                </Card>
            </div >
        </>
    )
}
export default Register