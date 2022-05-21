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
      this.setState({account: accounts[0]});
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
        {from:this.state.account}
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      

      const contract =  this.state.contract
      const cnt = await contract.methods.getNum().call()
      this.setState({cnt})
      console.log(cnt)
      
      let tempState = {candidates: [], time: 0}
      this.setState ({elections: [tempState]});
      
      for(var i = 0; i<cnt;i++) {
        const running = await contract.methods.isRunning(i).call()
        if(!running)
        {
          continue;
        }
        const numCandidates = await contract.methods.getNumOfCandidates(i).call()
        console.log(numCandidates)
        let curr      //push in state
        for(var j = 0;j<numCandidates;j++)
        {
          const candidateName = await contract.methods.getCandidate(i,j).call()
          const candidateVotes = await contract.methods.getVotes(i,j).call()
          
          curr.push([candidateName, candidateVotes])
        }
        let timeLeft = await contract.methods.getTimeLeft(i).call()   //push in state
        
        //add chairperson or title feature later
        
        this.setState(
          {elections: [...this.state.elections, {candidates: curr, time: timeLeft}]}
        )

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
      account: '',
      elections: [],

    }

    
    this.setAccount = this.setAccount.bind(this)
    this.addPoll = this.addPoll.bind(this)
  }

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
    await this.state.contract.methods.createElection(temp, timeLeft).send()

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
            <Route path="/" element={<Election />} />
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
