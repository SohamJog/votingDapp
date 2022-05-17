// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Voting 
{
    struct Voter {
        uint toId;            //voted for this id default -1
        bool voted;         //voted in this election default false
    }
    struct Candidate 
    {
        bytes32 name;   
        uint voteCount; 
    }
    struct Election 
    {
        address chairperson;                        //creator
        bool ended;                                 
        uint endTime;                               //ending time
        mapping(address => Voter) voters;           //voters
        Candidate[] candidates;
    }


    uint num = 0;           //number of elections
    Election[] public elections;

    function getNum() external view returns(uint) 
    {
        return num;
    }
    
    function createElection(bytes32[] calldata proposalNames, uint votingTime) external
    {
        uint _endTime = votingTime+block.timestamp;

        Election storage newElection = elections[num++];


        newElection.chairperson = msg.sender;
        newElection.ended = false;
        newElection.endTime = _endTime;

        for (uint i = 0; i < proposalNames.length; i++) 
        {
                newElection.candidates.push(Candidate({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint _electionId, uint _id) external
    {
        Election storage ballot = elections[_electionId];
        if(block.timestamp>ballot.endTime)
        {
            revert("voting has ended");
        }
        Voter storage sender = ballot.voters[msg.sender];
        Candidate storage receiver = ballot.candidates[_id];
        require(sender.voted==false);
        receiver.voteCount++;
        sender.voted = true;
        sender.toId = _id;
    }




}