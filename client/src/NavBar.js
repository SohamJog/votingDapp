import React from 'react';


const NavBar = () => {
    return ( 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h1 class="nav-item">Decentralized Polls</h1>

           

            <a class="nav-link nav-item h3" href="/">Home</a>

            <a class="nav-link nav-item h3" href="/create">New Poll</a>

        </nav>
     );
}
 
export default NavBar;