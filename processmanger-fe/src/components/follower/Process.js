import {useDispatch, useSelector} from "react-redux";
import AnswerStage from "./AnswerStage";
import {useEffect} from "react";
import {SELECT_STAGE} from "../../modules/followers";

const Process= ({_useSelector=useSelector, _useDispatch= useDispatch,_AnswerStage=AnswerStage}) => {
    const dispatch = useDispatch();
    const currentProcess = _useSelector(state=>state.followers.currentProcess)

    useEffect(()=>{
       dispatch({type:SELECT_STAGE, payload:currentProcess.stages[0]})
    },[])
    return <div  className="m-auto">
        <h4>Process Name: {currentProcess.title}</h4>


        <_AnswerStage/>

    </div>
}

export default Process