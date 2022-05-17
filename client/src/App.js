import React, { Component } from "react";
import SimpleStorageContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import NavBar from './NavBar';
import Election from './Election';
import Create from './Create';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };



  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({account: accounts[0]});

      const contract =  this.state.contract
      const cnt = await contract.methods.getNum().call()
      this.setState(cnt)
      console.log(cnt)

      for(var i = 1; i<=cnt;i++) {
        const task = await contract.methods.elections(i).call
        this.setState({
          tasks: [...this.state.tasks, task]
        })
      }

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  constructor(props)
  {
    super(props)

    this.state = {
      
    }

    

    this.addPoll = this.addPoll.bind(this)


  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  addPoll = async (poll) => {
    

  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <BrowserRouter>
        <div className="App">

          <NavBar />

          <p>Your account: {this.state.account}</p>

          <Routes>
            <Route path="/" element={<Election />} />
            <Route path="/create" element={<Create />} />
          </Routes>
          

          <div className="content">
           
          </div>
        </div>

        </BrowserRouter>

    );
  }
}

export default App;
