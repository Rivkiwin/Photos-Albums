import { type } from 'os';
import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import AlertPop from '../Alert';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';

function LogIn() {

    const { authService } = useService();
    const { setCurrentUser } = useAuth();
    const [user, setUser] = useState({ email: '', password: '' });

    const history = useHistory();

    const handleChange = ({ target }: any) => {
        setUser({ ...user, [target.name]: target.value })
    }

    const handleChangeSubmit = async (event: any) => {
        event.preventDefault();
        authService.signIn(user).then(res => {
            if (res) {
                console.log(res);
                // localStorage.setItem('token', res.data.token)
                history.push('/albums/');
            }
        })
    }

    return (
        <>
            <div className="row justify-content-center mt-5">
                <Card border="dark d-flex justify-content-center col-4">
                    <form onSubmit={handleChangeSubmit}>
                        <h3>Sign In</h3>
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
                        <div className="mb-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            <a href="LogUp">create new accent</a>
                        </p>
                    </form>
                </Card>
            </div >
        </>
    )
}
export default LogIn