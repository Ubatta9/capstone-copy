import {useDispatch, useSelector} from "react-redux";
import AllProcesses from "./editor/AllProcesses";
import {initiateEditor} from "../modules/editors";
import {useEffect} from "react";

export default function FollowerHome({_useSelector=useSelector,_useDispatch = useDispatch,_initiateEditor=initiateEditor()}){
    const dispatch = _useDispatch();
    useEffect(
        () => {
            dispatch(_initiateEditor)
        },[]
    );
    return(
        <div>
            Follower Home
            <AllProcesses />
        </div>
    )
}