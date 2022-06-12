import {useDispatch, useSelector} from "react-redux";
import {Button, Card, CardGroup} from "react-bootstrap";
import {EDITOR_START, FOLLOWER_START} from "../modules/editors";
import EditorHome from './EditorHome';
import FollowerHome from "./FollowerHome";


export default function Homepage({_useDispatch = useDispatch, _useSelector = useSelector}){
  const dispatch = _useDispatch();
  const isEditor  = _useSelector(state => state.editors.isEditor);
  const isFollower = _useSelector(state => state.editors.isFollower);
  const onEditorClick = () =>{
      dispatch({type: EDITOR_START})
  }
  if(isEditor)
      return <EditorHome />
  if(isFollower)
      return <FollowerHome />
  // home page
    return <CardGroup>
        <Card>
            <Card.Header>Editor</Card.Header>
            <Card.Body>
                <Button title='Editor' onClick={onEditorClick}>Editor</Button>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>Follower</Card.Header>
            <Card.Body>
                <Button title='Follower' onClick={() => dispatch({type:FOLLOWER_START})}>Follower</Button>
            </Card.Body>
        </Card>
    </CardGroup>

    /* (Dispatches are marked as "->")
    * User Clicks on Editor
    * -> showEditor as true
    *  User is navigated to Editor home page
    *  Editor Home page we will have two buttons, one for Add Process and one for Show finished processes
    *  -> navigate to Editor home screen and trigger get all processes API and show them in the UI
    *  Click on Add process
    *  User is Navigate to Process Screen with Add Stage form [name, order, responseType,  responseList]
    *  User enters the form data and clicks on Add Stage/Create Process Button
    *  -> Trigger Add process API call
    *  -> with the received processId, update the store with process name, id and stages
    *  After adding stage, user will be shown two button complete process, cancel process
    *  User clicks on complete process
    *  -> navigate to Editor home screen and trigger get all processes API
    *  User is shown all the processes
    *
    *  User will also have a button to show finished processes
    * -> triggering get all finished processes
    * */


    /*
    Process - > 3 stages
    stage 1 is "name"
    stage 2 is "gender"
    stage 3 is "age"
    * */

    /*
    Process - > 4 stages
    stage 1 is "name" - [1]
    stage 2 is "gender" [2]
    stage 3 is "age" [3]
    stage 4 is "interests" [4]
    * */

    /*
   Process - > 4 stages
   stage 1 is "name" [1]
   stage 2 is "gender" [3]
   stage 3 is "age" [2]
   stage 4 is "interests" [4]

   UI - > name, age, gender, interests
   * */
}