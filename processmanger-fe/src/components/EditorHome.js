import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initiateEditor, initiateFinishedProcessFollowings, SHOW_ADD_EDIT_PROCESS, SHOW_FINISHED_PROCESSES} from "../modules/editors";
import AllProcesses from "./editor/AllProcesses";
import AddEditProcess from "./editor/AddEditProcess";
import {Button} from "react-bootstrap";
export default function EditorHome({_useSelector = useSelector,_useDispatch = useDispatch, _initiateEditor = initiateEditor(),
                                       _initiateFinishedProcessFollowings=initiateFinishedProcessFollowings(), _AddEditProcess=AddEditProcess, _AllProcesses = AllProcesses}) {
    const dispatch = _useDispatch();
    useEffect(
        () => {
            dispatch(_initiateEditor)
        },[]
    );
    const showAddEditProcess = _useSelector(state=>state.editors.showAddEditProcess)
    const showFinishedProcess = _useSelector(state=>state.editors.showFinishedProcess)

    const addEditButton = ()=>{
        return(
            <span>
                <Button title='Add Process' onClick = {()=>{
                    dispatch({type: SHOW_ADD_EDIT_PROCESS, payload :{}})
                }}>Add Process</Button>
            </span>
        )}
    const finishedProcessButton = () => {
        return(
            <span style={ {float:"right",  padding: '5px'}}>
                <Button title ='Finished ProcessFollowings' onClick = {() => {
                    dispatch({type: SHOW_FINISHED_PROCESSES})}}>Finished ProcessFollowings</Button>
            </span>
        )
    }

    return(
        <div>
            Editor Home
            <div>
            {showAddEditProcess?
                <_AddEditProcess />:
                addEditButton()
            }

            {
                !showAddEditProcess && showFinishedProcess?
                    <_AllProcesses finished={true} />:
                        !showAddEditProcess ?finishedProcessButton():<></>
            }
            </div>
            {!showAddEditProcess && !showFinishedProcess?
                <_AllProcesses />:<></>
            }

        </div>
    )
}