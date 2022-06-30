import {useDispatch, useSelector} from "react-redux";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import {ANSWER_STAGE, answerStage, CANCEL, NEXT_STAGE, SUBMIT} from "../../modules/followers";
import {useState} from "react";

const AnswerStage = ({_useSelector=useSelector, _useDispatch= useDispatch, _answerStage = answerStage()}) =>{
    const [validity, setValidity] = useState(false);
    const dispatch = _useDispatch();
    const {currentProcess, currentStage} = _useSelector(state=>state.followers)
    const isLastStage = currentProcess && currentStage
        ?currentProcess.stages[currentProcess.stages.length-1].id===currentStage.id
        : false;

    const onNextClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            dispatch(_answerStage);
            setValidity(false);
        }

        setValidity(true);
    };


    if(!currentStage || !currentProcess) {
        return <div>Loading...</div>
    }



    return <div className="m-auto">
                <div className={"m-3"}>
                    <div>Prompt : <span>{currentStage.name}</span></div>

                   
                    <Form noValidate validated={validity} onSubmit={onNextClick}>

                        {currentStage.type==="Boolean"?

                            <Form.Group as={Row}>
                                <Form.Check
                                    inline
                                    name='radio 1'
                                    label="True"
                                    feedback="Please select"
                                    feedbackType="invalid"
                                    value="True"
                                    required
                                    type='radio'
                                    onChange={e=> dispatch({type:ANSWER_STAGE,payload:e.target.value})}/>
                                <Form.Check
                                    inline
                                    name='radio 1'
                                    label="False"
                                    value="False"
                                    type='radio'
                                    required
                                    onChange={e=> dispatch({type:ANSWER_STAGE,payload:e.target.value})}
                                />


                            </Form.Group>

                            :null}

                        {currentStage.type==="Feedback"?
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    placeholder='Enter response here'
                                    required={true}
                                    onChange={(e)=>dispatch({type:ANSWER_STAGE,payload:e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a value.
                                </Form.Control.Feedback>
                            </Form.Group>
                            :null
                        }
                        {currentStage.type==="Multiple Choice" || currentStage.type==="list" ?
                            <Form.Group>
                                <div>
                                    {currentStage.choices.map((choice, ind)=>(
                                            <Form.Check
                                                key={choice.id}
                                                className="mb-6"
                                                inline
                                                required
                                                name={'radio options'}
                                                label={choice.choice_text}
                                                value={choice.choice_text}
                                                type='radio'
                                                onChange={e=> dispatch({type:ANSWER_STAGE,payload:e.target.value})}
                                            />
                                        )
                                    )}
                                </div>

                            </Form.Group>:
                            <></>
                        }
                        <Button variant="primary" type="submit" className="m-2">{isLastStage ? "Submit":"Next"}</Button>
                        <Button variant="secondary" type="cancel" onClick={()=>dispatch({type:CANCEL})}>Cancel</Button>
                    </Form>
                </div>

    </div>
}

export default AnswerStage

// Revisit all validations - TODO
// Remove finished processes from all process - TODO
// Revisit all the actions/reducers - TODO (GO_BACK -> HOME)
// Revisit all Styles - TODO
// Add code formatter(Prettier) to IntelliJ