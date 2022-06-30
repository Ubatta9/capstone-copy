import {useDispatch, useSelector} from "react-redux";
import AllProcesses from "./follower/AllFollowerProcesses";
import {useEffect} from "react";
import {GO_BACK, initiateFollower} from "../modules/followers";
import {Button} from "react-bootstrap";

export default function FollowerHome({_useSelector=useSelector,_useDispatch = useDispatch,_initiateFollower=initiateFollower()}){
    const dispatch = _useDispatch();
    useEffect(
        () => {
            dispatch(_initiateFollower)
        },[]
    );
    return(
        <div>
            Follower Home
            <span style={ {float:"right",  padding: '5px'}}>
            <Button variant="outline-primary" onClick={()=> dispatch({type:GO_BACK})}>Go Back</Button>
            </span>
            <AllProcesses />

        </div>
    )
}