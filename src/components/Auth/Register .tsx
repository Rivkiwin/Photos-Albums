import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import AlertPop from '../Alert';
import { useAuth } from '../AuthProvider';
import { useService } from '../ServiceProvider';

function Register() {

    const { authService } = useService();
    const { setCurrentUser } = useAuth();
    const history = useHistory();

    const [err, setErr] = useState(false)
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
            if (res) {
                setCurrentUser(res.data.user);
                localStorage.setItem('token', res.data.token);
                history.push('/albums/');
            }

        });
    }
    return (
        <>
            {err && <AlertPop message='err at login pleas try agin' type="danger" />}
            <div className="row justify-content-center mt-5">
                <Card border="dark d-flex justify-content-center col-4">
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