import {render,screen} from "@testing-library/react";
import AddEditProcess from "./AddEditProcess";
import userEvent from "@testing-library/user-event";
import {CANCEL_PROCESS} from "../../modules/editors";


it('should dispatch CANCEL_PROCESS when cancel button is clicked',() => {
    const dispatch =jest.fn();
    const initEditProcess = jest.fn();
    const initAddProcess = jest.fn();
    const ret1 = 'some return';
    const ret2 = 'other return';
    initEditProcess.mockImplementation(() => ret1);
    initAddProcess.mockImplementation(() => ret2);
    const currentProcess = {};//{title:'Process Title', processId:'12',stages:[{}]}
    const state = {editors:{currentProcess}}
    render(<AddEditProcess _useSelector={fn => fn(state)} _useDispatch={()=> dispatch}
    _initiateAddProcess={initAddProcess} _initiateEditProcess={initEditProcess} StageC ={()=>{}}/>)
    userEvent.click(screen.getByTitle('Cancel'),currentProcess)
    expect(dispatch).toHaveBeenCalledWith({type:CANCEL_PROCESS})
})
it('should dispatch SUBMIT_PROCESS when Submit process button is clicked',() => {
    const dispatch =jest.fn();
    const initEditProcess = jest.fn();
    const initAddProcess = jest.fn();
    const ret1 = 'some return';
    const ret2 = 'other return';
    initEditProcess.mockImplementation(() => {});
    initAddProcess.mockImplementation(() => {});
    const currentProcess = {
        title:'Process Title',
        stages:[]
    };//{title:'Process Title', processId:'12',stages:[{}]}
    const state = {editors:{currentProcess}}
    render(
        <AddEditProcess
        _useSelector={fn => fn(state)}
        _useDispatch={()=> dispatch}
        _initiateAddProcess={initAddProcess}
        _initiateEditProcess={initEditProcess}
        StageC={()=>{}}
    />)
    userEvent.click(screen.getByTitle('Submit Process'))
    expect(dispatch).toHaveBeenCalledWith(initAddProcess)
})
it('should dispatch ADD_STAGE when Add stage button is clicked',() => {
    const dispatch =jest.fn();
    const initEditProcess = jest.fn();
    const initAddProcess = jest.fn();
    const ret1 = 'some return';
    const ret2 = 'other return';
    initEditProcess.mockImplementation(() => {});
    initAddProcess.mockImplementation(() => {});
    const currentProcess = {
        title:'Process Title',
        stages:[]
    };//{title:'Process Title', processId:'12',stages:[{}]}
    const state = {editors:{currentProcess}}
    render(
        <AddEditProcess
            _useSelector={fn => fn(state)}
            _useDispatch={()=> dispatch}
            _initiateAddProcess={initAddProcess}
            _initiateEditProcess={initEditProcess}
            StageC={()=>{}}
        />)
    userEvent.click(screen.getByTitle('Submit Process'))
    expect(dispatch).toHaveBeenCalledWith(initAddProcess)
})