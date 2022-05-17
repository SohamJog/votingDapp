import React,{useState} from 'react';



const Election = () => {


    const [elections, setElections] = useState(
        [
            {timeRemaining: 0, title: 'peeps', candidates: [
                {nom: 'jerry', votes: 3},
                {nom: 'partly', votes: 3}
            ]},
            {timeRemaining: 360, title: 'gnyan', candidates: [
                {nom: 'gomnom', votes: 7}
            ]},
            {timeRemaining: 300, title: 'loop', candidates: [
                {nom: 'gomnom', votes: 7},
                {nom: 'lol', votes: 3},
                {nom: '5ol', votes: 3}
            ]}
        ]
    );



    return ( 
    <div className='electionList'>
        {elections.map((election) => (


            <div className='individual-election'>
                 <h2>{election.title}</h2>
                <p>time remaining {election.timeRemaining}</p>
                {
                    election.candidates.map(
                        (candidate) => (

                            <div className='individual-candidate'>
                                <span id = 'name'>{candidate.nom} </span>
                                <span id = 'votes'>{candidate.votes} </span>
                            </div>
                        )
                    )
                }
            </div>
           

        ))

        }
    </div> 
    
    );
}
 
export default Election;