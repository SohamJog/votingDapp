import React from 'react';


const NavBar = (props) => {

    props.setAccount()
    return ( 
        <nav >

            <p>Your account: {props.account}</p>
            <h1>Decentralized Polls</h1>

           

            <span><a href="/">Home</a></span>

            <span><a href="/create">New Poll</a></span>

        </nav>
     );
}
 
export default NavBar;