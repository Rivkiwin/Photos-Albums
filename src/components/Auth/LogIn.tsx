import { sendPasswordResetEmail } from 'firebase/auth';
import { type } from 'os';
import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
                        <div className="d-grid">
                            <button type="submit" className="btn btn-secondary">
                                Submit
                            </button>
                        </div>
                        <div className='d-flex justify-content-between mb-2 mt-2'>
                        <Link to='/forgot-password'>Forgot your Password?</Link>
                            <a href="LogUp">create new accent</a>
                            </div>

                    </form>
                </Card>
            </div >
        </>
    )
}
export default LogIn