import {render,screen} from "@testing-library/react";
import AllProcesses from "./AllProcesses";
import userEvent from "@testing-library/user-event";
import {DELETE_PROCESS, SHOW_ADD_EDIT_PROCESS} from "../../modules/editors";

it('should edit processes',() =>{
    const dispatch = jest.fn();
    const initFinish = jest.fn();
    const ret2 = 'another return';
    initFinish.mockImplementation(() => ret2)
    const initDelete = jest.fn();
    const ret = 'another return';
    initFinish.mockImplementation(() => ret)
    const processes =[{title:'sometitle',id:20,
        stages:[{name:'some stage',order:1,type:'Boolean',choices:[{
            choice_text:'some text',id:24
            }]}]}]
    render(<AllProcesses _useSelector={()=>processes} _useDispatch={()=>dispatch}
    _initiateDeleteProcess ={initDelete} _initiateFinishedProcessFollowings={initFinish} finished={false}/>)
    userEvent.click(screen.getByTitle('Edit'))
    expect(dispatch).toHaveBeenCalledWith({type:SHOW_ADD_EDIT_PROCESS,payload:processes[0]})
})
it('should delete a processe',() =>{
    const dispatch = jest.fn();
    const initFinish = jest.fn();
    const ret2 = 'another return';
    initFinish.mockImplementation(() => ret2)
    const initDelete = jest.fn();
    const ret = 'another return';
    initFinish.mockImplementation(() => ret)
    const  processes =[{
        title: 'sometitle',
        id: 22,
        stages: [{
            id: 23,
            name: 'some stage',
            order: 1,
            type: 'Boolean',
            choices: [{
                choice_text: 'some text', id: 25
                }]
            }]
    }]

    render(<AllProcesses _useSelector={()=>processes} _useDispatch={()=>dispatch}
                         _initiateDeleteProcess ={initDelete} _initiateFinishedProcessFollowings={initFinish} finished={false}/>)
    userEvent.click(screen.getByTitle('Delete'))
    expect(dispatch).toHaveBeenCalledWith({type:DELETE_PROCESS,payload:processes[0].id})
})