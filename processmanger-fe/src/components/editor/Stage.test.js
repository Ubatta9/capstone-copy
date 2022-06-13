import {render,screen} from "@testing-library/react";
import Stage from "./Stage";
import {ADD_EDIT_STAGE_DETAILS} from "../../modules/editors";
// it('should show stage name, order, type and choices when we add stage details',() => {
//
//     const dispatch =jest.fn();
//     const currentProcess = {
//         title:'process title',
//         processId:0,
//         stages:[]
//     };
//     const stage = {name: 'somename', stage_order: 0, type:'Boolean', choices:[]}
//     const state = {editors:{currentProcess:{stages:{stage}}}}
//     render(<Stage _useSelector={fn => fn(state)} _useDispatch={()=> dispatch} ind:stageIndex/>)
//     expect(screen.getByDisplayValue(stage.name)).toBeInTheDocument();
//     //expect(screen.getByDisplayValue(stage.order)).toBeInTheDocument();
//     //expect(screen.getByDisplayValue(stage.type)).toBeInTheDocument();
//     expect(dispatch).toHaveBeenCalledWith({type:ADD_EDIT_STAGE_DETAILS},payload:{stageIndex,stageKey:'name'})
//
// })