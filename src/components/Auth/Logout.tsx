  import React from 'react';
  import { useHistory } from 'react-router-dom';

function Logout(){
    localStorage.removeItem("currentUser")
    const history = useHistory();
    history.push('/LogIn')
    return(
        <></>
    )
}

export default Logout;