import {useDispatch, useSelector} from "react-redux";
import {PROCESS_START, startProcess} from "../../modules/followers";
import {Button, Card} from "react-bootstrap";
import Process from "./Process";



export default function AllFollowerProcesses(
    {
        _useDispatch=useDispatch,
        _useSelector=useSelector,
        _initiateStartProcess= startProcess()
    }){
    const dispatch = _useDispatch()
    const processes = _useSelector(state => state.followers.processes)
    const showStartProcess = _useSelector(state=>state.followers.showStartProcess)
    const onStart = (process) =>{
        dispatch({type:PROCESS_START,payload:process})
        dispatch(_initiateStartProcess)
    }
    return(
    <div>{
        showStartProcess?
            <Process /> :
            processes.map(process=>(
            <div key={process.id}>
                <Card  style ={{margin: '10px'}}>
                    <Card.Header>{process.title}</Card.Header>
                    <Card.Body>
                        <span style={{padding:"10px"}}><Button onClick={()=> {onStart(process)}}>Start Process</Button></span>

                    </Card.Body>
                </Card>
            </div>

        ))}
    </div>
)
}