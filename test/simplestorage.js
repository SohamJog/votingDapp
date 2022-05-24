const Voting = artifacts.require("Voting.sol");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));


contract("Voting", (accounts) => {

  it('should store candidates', async () => {
    const simpleSmartContract = await Voting.new();

    const wing = await simpleSmartContract.createElection([web3.utils.asciiToHex("ss"),web3.utils.asciiToHex("aa") ], 500);

    const cand = await simpleSmartContract.getCandidate(0,0);
    

    assert( web3.utils.hexToAscii(cand) == "ss", "The value was not stored.");

  });

  it('should have 0 candidates',async () => {
    const simpleSmartContract = await Voting.new();



    const num = await simpleSmartContract.getNum();

    assert.equal(num, 0, "The value was not 0.");

  });

  
  xit("...should activate.", async () => {
    const VotingInstance = await Voting.deployed();

    assert(VotingInstance.address!=='', "The contract wasn't deployed");
  });
  
});

/*
const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract', () => {
  it('should be deployed', async () => {
    const simpleSmartContract = await SimpleSmartContract.deployed();
    assert(simpleSmartContract.address !== '');
  });
});
*/