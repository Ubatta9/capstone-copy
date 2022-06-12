import {useDispatch, useSelector} from "react-redux";
import AllProcesses from "./editor/AllProcesses";

export default function FollowerHome({_useSelector=useSelector,_useDispatch = useDispatch}){
    const dispatch = _useDispatch();
    //useEffect
    return(
        <div>
            Follower Home
            <AllProcesses />
        </div>
    )
}