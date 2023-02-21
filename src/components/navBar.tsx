import React, { useContext, useEffect } from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'react-router-dom';
import Albums from './Albums/Albums';
import { AppContext, IServices } from './AppProvider';
import Body from './Body';
import Info from './Info';
import LogIn from './LogIn';
import Logout from './Logout';
import Photos from './Photos';
import Posts from './Posts';
import Todos from './Todos';

function NavBar() {
    const { 
        services: { 
          authService
        } 
      }= useContext(AppContext) as IServices;

    useEffect((()=>{
        console.log(window.location.href);
        console.log(authService?.isAuthenticated())
    }),[] )

    return (
        <div className="pos-f-t">
            <nav className="navbar navbar-dark bg-dark p-2">
                    <ul className="navbar-nav align-items-sm-center flex-md-row">
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="menu" aria-expanded="false">
                                <button className="navbar-toggler" type="button">
                                    <div className="navbar-toggler-icon"></div>
                                </button>
                            </a>
                            <div className="dropdown-menu  bg-dark position-absolute" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item text-white" aria-current="page" to="/Info">info</Link>
                                <Link className="dropdown-item text-white" to="/Todos">Todos</Link>
                                <Link className="dropdown-item text-white" to="/Posts">Posts</Link>
                                <Link className="dropdown-item text-white" to="/Albums">Albums</Link>
                            </div>
                        </li>
                        {authService?.isAuthenticated() && <li className="nav-item text-white"> <Link className="dropdown-item text-white" to="/Logout">log out</Link></li>}
                        {!authService?.isAuthenticated() && <li className="nav-item text-white"> <Link className="dropdown-item text-white" to="/login">log in</Link></li>}

                    </ul>
            </nav>
            <Switch>
                <Route path="/Info">
                    <Info />
                </Route>
                <Route path="/Logout">
                    <Logout />
                </Route>
                <Route path="/LogIn">
                    <LogIn />
                </Route>
                <Route path="/Todos">
                    <Todos />
                </Route>
                <Route exact path="/Posts">
                    <Posts />
                </Route>
                <Route exact path="/Posts/body">
                    <Body />
                </Route>
                <Route exact path="/Albums">
                    <Albums />
                </Route>
                <Route exact path="/Albums/:id/Photos">
                    <Photos />
                </Route>
            </Switch>
        </div>
    )
}
export default NavBar