import React, { Component, useState } from "react";
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
      this.setState({account: accounts[0]});
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
        
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      

      const contract =  this.state.contract
      const cnt = await contract.methods.getNum().call()
      this.setState({cnt})
      console.log(cnt)
      




      
     // let tempState = {candidates: [], time: 0}
     let elec = []
      this.setState ({elections: elec});
      
      for(var i = 0; i<cnt;i++) {
        const running = await contract.methods.isRunning(i).call()
        if(!running)
        {
          continue;
        }
        const numCandidates = await contract.methods.getNumOfCandidates(i).call()

        let curr      //push in state
        for(var j = 0;j<numCandidates;j++)
        {
          const candidateName = await contract.methods.getCandidate(i,j).call()
          const candidateVotes = await contract.methods.getVotes(i,j).call()



          
          curr.push({cname: candidateName, cvotes: candidateVotes})
        }
        let timeLeft = await contract.methods.getTimeLeft(i).call()   //push in state
        
        //add chairperson or title feature later
        
        this.setState(
          {elections: [...this.state.elections, {candidates: curr, time: timeLeft}]}
        )

        console.log(this.state.elections);

      }
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  setAccount = async() => {
    const accounts = await this.state.web3.eth.getAccounts();
    this.state.account = accounts[0]
    
  }
  

  addPoll = async (poll) => 
  {
    console.log("addpoll")
    /*
  poll = 
  {
    timeLeft: x
    candidates: [c1 c2 ...]
  }
  */
    //function createElection(bytes32[] calldata proposalNames, uint votingTime)
    let temp = []
    let timeLeft = poll.timeLeft
    for(var i= 0;i<poll.candidates.length;i++)
    {
      temp.push(this.state.web3.utils.asciiToHex(poll.candidates[i]));
    }
    //edit edit
    await this.state.contract.methods.createElection(temp, timeLeft).send({from:this.state.account, value: 0})

  }



 

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <BrowserRouter>
        <div className="App">

          <NavBar  
          setAccount = {this.setAccount}
          account = {this.state.account}
          />

          

          <Routes>
            <Route path="/" element={<Election
              elections = {this.elections}
            />} />
            <Route path="/create" element={<Create 
              addPoll = {this.addPoll}
              
            />} />
          </Routes>
          

          <div className="content">
           
          </div>
        </div>

        </BrowserRouter>

    );
  }
}

export default App;
