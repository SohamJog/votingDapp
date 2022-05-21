import React, {useState} from 'react';

const Create = (props) => {


    let [poll, setPoll] = useState({timeLeft: 0, candidates: []})
    let [candidates, setCandidates] = useState([]);
    let [temporary, setTemp] = useState([]);
    let [time, setTime] = useState();
    let [numberOfCandidates, setNum] = useState(0);


    const handleSubmit = () => {
        console.log("hello")
        const temp = {timeLeft: 0, candidates: []}
        temp.timeLeft = time
        temp.candidates = [...candidates]
        setPoll(temp)
        props.addPoll(poll)
    }
    const handleTime = (event) => {
        const num = event.target.value
        setTime(num)
    }


    const setNumberOfCandidates = (event) => {
        
        const num = event.target.value
        setNum(num)
        const temp = []
        const temp1 = []

        for(var i=0;i<num;i++)
        {
            temp[i] = "";
            temp1[i] = i
        }
        setCandidates(temp)
        setTemp(temp1)
    }

    const setCandidate = (event, id) => {
        const v = event.target.value
        let temp = [...candidates]
        temp[id] = v
        setCandidates(temp)

    }


    const show = () => {
        console.log(poll)
    }
    
    

    return ( 
        <div className="create">
            <div>


                
                <label htmlFor="num">Number of Candidates:</label><br/>
                <input type="number" id="num" value = {numberOfCandidates} onChange={setNumberOfCandidates}></input><br/>

                <label htmlFor="time">How many seconds:</label><br/>
                <input type="number" id="time" onChange={handleTime}></input><br/>


                {
                    temporary.map(
                        item => (
                           <span key = {item}> <input type = "text"  onChange = {(event) => {setCandidate(event,item)}} ></input> <br/></span>
                        )
                    )
                }

                <button onClick={() =>{handleSubmit()}}>Add to the Blockchain!</button>
                
                <button onClick={show}>Click me</button>

            </div>

            
            
        </div>
     );
}
 
export default Create;