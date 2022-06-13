import {render, screen} from "@testing-library/react";
import EditorHome from "./EditorHome";
import {SHOW_ADD_EDIT_PROCESS, SHOW_FINISHED_PROCESSES} from "../modules/editors";
import userEvent from "@testing-library/user-event";


it('should dispatch SHOW_ADD_EDIT_PROCESS when Add process button is clicked', () => {
    const dispatch = jest.fn();
    const initEditor = jest.fn()
    const ret = 'some return'
    initEditor.mockImplementation(() => ret)
    const initFinish = jest.fn();
    const ret2 = 'another return';
    initFinish.mockImplementation(() => ret2)
    render(<EditorHome _useSelector={() => {
    }} _useDispatch={() => dispatch}
                       _initiateEditor={initEditor} _AddEditProcess={() => {
    }} _AllProcesses={() => {
    }} _initiateFinishedProcessFollowings={initFinish}/>)
    userEvent.click(screen.getByTitle('Add Process'));
    expect(dispatch).toHaveBeenCalledWith({type: SHOW_ADD_EDIT_PROCESS, payload: {}})
})
it('should dispatch SHOW_FINISHED_PROCESS when finished processFollowings button is clicked', () => {
    const dispatch = jest.fn();
    const initEditor = jest.fn()
    const ret = 'some return'
    initEditor.mockImplementation(() => ret)
    const initFinish = jest.fn();
    const ret2 = 'another return';
    initFinish.mockImplementation(() => ret2)
    render(<EditorHome _useSelector={() => {
    }} _useDispatch={() => dispatch}
                       _initiateEditor={initEditor} _AddEditProcess={() => {
    }} _AllProcesses={(finished) => {
        return !finished ? 'All Processes' : 'All Finished Processes'
    }} _initiateFinishedProcessFollowings={initFinish}/>)
    userEvent.click(screen.getByTitle('Finished ProcessFollowings'));
    expect(dispatch).toHaveBeenCalledWith({type: SHOW_FINISHED_PROCESSES})
});
it('should dispatch All processes when Editor homepage is opened', () => {
    const dispatch = jest.fn();
    const initEditor = jest.fn()
    const ret = 'some return'
    initEditor.mockImplementation(() => ret)
    const initFinish = jest.fn();
    const ret2 = 'another return';
    initFinish.mockImplementation(() => ret2)
    render(<EditorHome _useSelector={() => {
    }} _useDispatch={() => dispatch}
                       _initiateEditor={initEditor} _AddEditProcess={() => {
    }} _AllProcesses={({finished}) => {
        return !finished ? <div>All Processes</div> : 'All Finished Processes'
    }} _initiateFinishedProcessFollowings={initFinish}/>)
    expect(screen.getByText('All Processes')).toBeInTheDocument();
    expect(dispatch).toHaveBeenCalledWith(initEditor);
});