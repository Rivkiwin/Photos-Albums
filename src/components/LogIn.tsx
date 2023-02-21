import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppContext } from './AppProvider';

function LogIn() {

    const history = useHistory();
    const { 
        services: { 
          authService
        } 
      }: any = useContext(AppContext);

    const [user, setUser] = useState({
        name: '',
        password: ''
    });

    const handleChange = ({ target }: any) => {
        setUser({ ...user, [target.name]: target.value })
    }

    const handleChangeSubmit = async (event: any) => {
        event.preventDefault();
        await authService.signIn(user);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        for (let i = 0; i < users.length; ++i) {
            if (users[i].address.geo.lat.slice(-4) === user.password && users[i].username === user.name) {
                localStorage.setItem("currentUser", JSON.stringify(users[i]));
                history.push(`/Application/users/${users[i].id}/`)
                return;
            }
        }
        alert("Unauthorized user");
    }

    return (
        // < form onSubmit={handleChangeSubmit} className="center">
        //     <div className="mb-3">
        //         <label htmlFor="exampleInputEmail1" className="color form-label">User name</label>
        //         <input type="text" placeholder="userName" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} required />
        //         <div id="emailHelp" className="form-text">We'll never share your details with anyone else.</div>
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="exampleInputPassword1" className="color form-label">Password</label>
        //         <input type="password" placeholder="password" name="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} required />
        //     </div>

        //     <input type="submit" value="log in" className="btn btn-primary" className="btn btn-danger" />
        // </form> 
        <div className="row justify-content-center mt-5">
          <Card border="info d-flex justify-content-center col-4">
          <form onSubmit={handleChangeSubmit}>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>User name</label>
                    <input
                        required
                        onChange={handleChange}
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter name"
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
                    Forgot <a href="#">password?</a>
                </p>
            </form>
          </Card> 
        </div >
    )
}
export default LogIn