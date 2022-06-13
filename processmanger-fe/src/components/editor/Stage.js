import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {ADD_EDIT_STAGE_DETAILS} from "../../modules/editors";

export default function Stage({ind: stageIndex, _useDispatch = useDispatch, _useSelector = useSelector}) { // Can we get data from props
    const dispatch = _useDispatch();
    const stage = _useSelector((state) => state.editors.currentProcess.stages[stageIndex])
    const {name = "", stage_order = 0, type = "Boolean", choices = []} = stage;
    choices.sort((a, b) => a.id < b.id ? -1 : 1);
    return (
        <div style={{margin: '8px'}}>
            <h5>Stage {stageIndex + 1}</h5>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="stage.name">Stage Name</Form.Label>
                    <Form.Control id="stage.name" value={name || ''} onChange={e => dispatch({
                        type: ADD_EDIT_STAGE_DETAILS,
                        payload: {stageIndex, stageKey: 'name', stageValue: e.target.value}
                    })}/>
                </Form.Group>
                <Form.Label htmlFor='stage.order'>Stage Order</Form.Label>
                <Form.Control id='stage.order' value={stage_order || ''} onChange={e => dispatch({
                    type: ADD_EDIT_STAGE_DETAILS,
                    payload: {stageIndex, stageKey: 'stage_order', stageValue: e.target.value}
                })}/>
                <Form.Group>
                    <Form.Label htmlFor='stage.type'>Select The Response Type</Form.Label>
                    <Form.Select id="stage.type" value={type} onChange={e => dispatch({
                        type: ADD_EDIT_STAGE_DETAILS,
                        payload: {stageIndex, stageKey: 'type', stageValue: e.target.value}
                    })}>
                        <option value={"Boolean"}>Boolean</option>
                        <option value={"Feedback"}>Text</option>
                        <option value={"Multiple Choice"}>Multiple Choice</option>
                    </Form.Select>
                </Form.Group>
                {
                    type === "Multiple Choice" ?
                        <Form.Group>
                            <Form.Label htmlFor='stage.type'>Multiple Choice</Form.Label>
                            <Form.Group>
                                <Form.Label htmlFor='stage.choice.a'>A</Form.Label>
                                <Form.Control id='stage.choice.a' value={choices[0] && choices[0].choice_text || ""}
                                              onChange={e => dispatch({
                                                  type: ADD_EDIT_STAGE_DETAILS,
                                                  payload: {
                                                      stageIndex,
                                                      stageKey: 'choices,0',
                                                      stageValue: e.target.value
                                                  }
                                              })}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='stage.choice.b'>B</Form.Label>
                                <Form.Control id='stage.choice.b' value={choices[1] && choices[1].choice_text || ""}
                                              onChange={e => dispatch({
                                                  type: ADD_EDIT_STAGE_DETAILS,
                                                  payload: {
                                                      stageIndex,
                                                      stageKey: 'choices,1',
                                                      stageValue: e.target.value
                                                  }
                                              })}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor='stage.choice.c'>C</Form.Label>
                                <Form.Control id='stage.choice.c' value={choices[2] && choices[2].choice_text || ""}
                                              onChange={e => dispatch({
                                                  type: ADD_EDIT_STAGE_DETAILS,
                                                  payload: {
                                                      stageIndex,
                                                      stageKey: 'choices,2',
                                                      stageValue: e.target.value
                                                  }
                                              })}/>
                            </Form.Group>
                        </Form.Group>
                        : <></>
                }

            </Form>
        </div>
    )
}

