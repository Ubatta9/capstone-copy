import Homepage from "./HomePage";
import {render,screen} from "@testing-library/react";
import {EDITOR_START} from "../modules/editors";
import {FOLLOWER_START} from "../modules/followers"
it('should Dispatch EDITOR_START when the Editor button is clicked',() => {
 const dispatch = jest.fn();
 render(<Homepage _useDispatch ={() => dispatch} _useSelector={() => {}}/>)
  screen.getByTitle('Editor').click();
 expect(dispatch).toHaveBeenCalledWith({type:EDITOR_START})
})
it('should Dispatch FOLLOWER_START when the Follower button is clicked',() => {
    const dispatch = jest.fn();
    render(<Homepage _useDispatch ={() => dispatch} _useSelector={() => {}}/>)
    screen.getByTitle('Follower').click();
    expect(dispatch).toHaveBeenCalledWith({type:FOLLOWER_START})
})


