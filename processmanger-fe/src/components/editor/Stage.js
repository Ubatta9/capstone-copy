import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {ADD_EDIT_STAGE_DETAILS} from "../../modules/editors";

export default function Stage({ ind:stageIndex, _useDispatch = useDispatch, _useSelector = useSelector})  { // Can we get data from props
    const dispatch = _useDispatch();
    const stage = _useSelector((state)=>state.editors.currentProcess.stages[stageIndex])
    const {name = "", stage_order = 0, type="Boolean", choices=[]} = stage;

    return (
        <div style={{margin: '8px'}}>
           <h5>Stage {stageIndex+1}</h5>
            <Form>
               <Form.Group>
                   <Form.Label>Stage Name</Form.Label>
                   <Form.Control value={name} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'name', stageValue:e.target.value}})} />
               </Form.Group>
                <Form.Label>Stage Order</Form.Label>
               <Form.Control value={stage_order} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'stage_order', stageValue:e.target.value}})} />
               <Form.Group>
                   <Form.Label>Select The Response Type</Form.Label>
               <Form.Select value={type} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'type', stageValue:e.target.value}})}>
                   <option value={"Boolean"}>Boolean</option>
                   <option value={"Feedback"}>Text</option>
                   <option value={"Multiple Choice"}>Multiple Choice</option>
               </Form.Select>
               </Form.Group>
               {
                   type==="Multiple Choice"?
                       <Form.Group>
                           <Form.Label>Multiple Choice</Form.Label>
                           <Form.Group >
                               <Form.Label>A</Form.Label>
                               <Form.Control value={choices[0]&&choices[0].choice_text||""} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'choices,0', stageValue:e.target.value}})}/>
                           </Form.Group>
                           <Form.Group >
                               <Form.Label>B</Form.Label>
                               <Form.Control value={choices[1]&&choices[1].choice_text||""} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'choices,1', stageValue:e.target.value}})}/>
                           </Form.Group>
                           <Form.Group >
                               <Form.Label>C</Form.Label>
                               <Form.Control value={choices[2]&&choices[2].choice_text||""} onChange={e=>dispatch({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex,stageKey:'choices,2', stageValue:e.target.value}})}/>
                           </Form.Group>
                       </Form.Group>
                       :<></>
               }

           </Form>
        </div>
    )
}

