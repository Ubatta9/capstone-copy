import {useDispatch, useSelector} from "react-redux";
import {Form, Button} from "react-bootstrap";
import Stage from "./Stage";
import {
    ADD_EDIT_PROCESS_NAME,
    ADD_STAGE,
    CANCEL_PROCESS,
    initiateAddProcess, initiateEditProcess,

} from "../../modules/editors";


export default function AddEditProcess({_useSelector = useSelector,_useDispatch = useDispatch,
                                           _initiateAddProcess= initiateAddProcess(), _initiateEditProcess = initiateEditProcess()}, StageC=Stage){
    const dispatch =_useDispatch();
    const currentProcess = _useSelector(state=>state.editors.currentProcess)
    const {title='', processId, stages=[]} = currentProcess;


    const onSubmit = () => {
        if(processId){
            dispatch(_initiateEditProcess)
        }else {
            dispatch(_initiateAddProcess)
        }
    }
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Process Name</Form.Label>
                    <Form.Control value={title} onChange={(e)=>dispatch({type:ADD_EDIT_PROCESS_NAME, payload:e.target.value})}/>
                </Form.Group>

            </Form>

            {stages.map((stage, ind)=> <StageC
                key={stage.id||ind} stage={stage} ind={ind} />)}
            <span style={ {float:"left",  padding: '5px'}}><Button title='Cancel' onClick={()=>dispatch({type:CANCEL_PROCESS})}>Cancel</Button></span>
            <span style={ {float:"right",  padding: '5px'}}><Button title ='Submit Process'type="primary" onClick={onSubmit}>Submit Process</Button></span>
            <span style={ {float:"right", padding: '5px'}}><Button title='Add Stage' type="primary" onClick={()=>dispatch({type:ADD_STAGE})}>Add Stage</Button></span>

        </div>
    )
}

