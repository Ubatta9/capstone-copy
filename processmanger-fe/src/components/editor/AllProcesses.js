import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button, Card} from "react-bootstrap";
import {
    SHOW_ADD_EDIT_PROCESS,
    DELETE_PROCESS,
    initiateDeleteProcess,
    initiateFinishedProcessFollowings
} from "../../modules/editors";
import {useEffect} from "react";

export default function AllProcesses({_useSelector = useSelector, _useDispatch = useDispatch, finished = false, _initiateDeleteProcess = initiateDeleteProcess(),_initiateFinishedProcessFollowings
 = initiateFinishedProcessFollowings()}){
    const dispatch = _useDispatch();
    useEffect(()=>{
       if(finished) dispatch(_initiateFinishedProcessFollowings)
    },[finished])
    const processes = _useSelector(state=>finished?state.editors.finishedProcesses:state.editors.processes)
    const onDelete = (process) =>{
        dispatch({type:DELETE_PROCESS,payload:process.id})
        dispatch(_initiateDeleteProcess)
    }
    return (
        <div>
            {processes.map(process=>(
                <div key={process.id}>
                    <Card  style ={{margin: '10px'}}>
                        <Card.Header>{process.title}</Card.Header>
                        <Card.Body>
                           <div> Total Stages: {process.stages.length}</div>{/*Add Accordion to show the stage details*/}
                            <Accordion defaultActiveKey = "0" style ={{margin: '5px'}}>
                                {process.stages.map((stage={}, index) => (
                                    <Accordion.Item eventKey={index} key={index}>
                                        <Accordion.Header>{stage.name}</Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                <p>Order: <span>{stage.order}</span></p>
                                                <p>Response Type: <span>{stage.type}</span></p>
                                                {stage.type==="Multiple Choice"?
                                                    <div>
                                                        {stage.choices.map((choice, ind)=>(
                                                                <div key={ind}>{ind+1}: {choice.choice_text}</div>
                                                            )
                                                        )}
                                                    </div>: <></>
                                                }
                                                {finished?
                                                    <div>Follower's Response: {stage.responseText}</div>:<></>
                                                }
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                            <span style={{padding:"10px"}}><Button title='Edit' onClick={()=>dispatch({type:SHOW_ADD_EDIT_PROCESS,payload:process})}>Edit</Button></span>
                            <span style={{padding:"10px"}}><Button title='Delete' onClick={()=> {onDelete(process)}}>Delete</Button></span>

                        </Card.Body>
                    </Card>
                </div>

            ))}
        </div>
    )
}

