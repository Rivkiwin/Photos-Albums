import React from 'react';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';


function Info(props: any) {
  const user = JSON.parse(localStorage.getItem("currentUser") as string);
  return (
    <div style={{ display: props.style, width: "35rem" }} className="center card" >
      <AccountBoxRoundedIcon style={{ fontSize: 80 }} />
      <div className="card-body">
        <h2 className="card-text">{user.username} details:</h2>
        <h3 className="card-text">address: {user.address.street}, {user.address.city}</h3>
        <h3 className="card-text">email: {user.email}</h3>
        <h3 className="card-text">phone: {user.phone}</h3>
      </div>
    </div>
  )
}

export default Info;