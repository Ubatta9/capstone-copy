import reducer, {
    ADD_EDIT_PROCESS_NAME, ADD_EDIT_STAGE_DETAILS, ADD_STAGE,
    CANCEL_PROCESS,
    DELETE_PROCESS,
    EDITOR_HOME_START,
    EDITOR_HOME_SUCCESS,
    EDITOR_START,
    EDITOR_SUCCESS,
    FOLLOWER_START,
    FOLLOWER_SUCCESS, initiateAddProcess, initiateDeleteProcess,
    initiateEditor, initiateEditProcess,
    initiateFinishedProcessFollowings,
    SHOW_ADD_EDIT_PROCESS, SUBMIT_PROCESS,
    UPDATE_FINISHED_PROCESSES,
    UPDATE_PROCESSES
} from "./editors";

it('should start with isEditor to false',() => {
    const state = reducer();
    expect(state.isEditor).toBe(false)

})
it('should start with isFollower to false', () => {
    const state = reducer();
    expect(state.isFollower).toBe(false)
})
it('should start Editor when Editor button clicked',() =>{
    const initialState = reducer();
    initialState.isEditor = false;
    const state = reducer(initialState, {type:EDITOR_START});
    expect(state.isEditor).toBe(true);
})
it('should set isEditor to false after Editor Button is clicked and entered ',() => {
    const initialState = reducer();
    initialState.isEditor = true;
    const state = reducer(initialState, {type:EDITOR_SUCCESS});
    expect(state.isEditor).toBe(false);
});
it('should start Follower when Follower button clicked',() => {
    const initialState = reducer();
    initialState.isFollower = false;
    const state = reducer(initialState, {type:FOLLOWER_START});
    expect(state.isFollower).toBe(true);
})
it('should set isFollower to false after Follower Button is clicked and entered ',() => {
    const initialState = reducer();
    initialState.isFollower = true;
    const state = reducer(initialState, {type:FOLLOWER_SUCCESS});
    expect(state.isFollower).toBe(false);
});
it('should start the Editor home page when entered the Home page', () => {
    const initialState = reducer();
    initialState.fetching = false;
    const state = reducer(initialState, {type:EDITOR_HOME_START});
    expect(state.fetching).toBe(true);
});
it('should set fetching to false and give all processes',() => {
    const initialState = reducer();
    initialState.fetching = true;
    const processes = 'some Processes';
    const state = reducer(initialState, {type:EDITOR_HOME_SUCCESS, payload:processes})
    expect(state.fetching).toBe(false);
    expect(state.processes).toBe(processes);
});
it('should update process when new process added',() => {
    const initialState = reducer();
    const processes = 'some process';
    const state = reducer(initialState,{type:UPDATE_PROCESSES,payload:processes});
    expect(state.processes).toBe(processes);
});
it('should update finished processes after response taken',() => {
    const initialState = reducer();
    const finishedProcesses = 'some finished processes';
    const state = reducer(initialState,{type:UPDATE_FINISHED_PROCESSES,payload:finishedProcesses});
    expect(state.finishedProcesses).toBe(finishedProcesses);
});
it('should set showAddEditProcess to true and return edited process',() => {
    const initialState = reducer();
    initialState.showAddEditProcess = false;
    const currentProcess = {processId:undefined,stages:'[{"some Stage"}]', title:"some Title"};
    const state = reducer(initialState,{type:SHOW_ADD_EDIT_PROCESS, payload:currentProcess});
    expect(state.showAddEditProcess).toBe(true);
    expect(state.currentProcess).toStrictEqual(currentProcess);
});
it('should edit title and keep the rest of the process',() =>{
    const initialState = reducer();
    initialState.currentProcess = {};
    initialState.currentProcess.title = "some title"
    const newTitle = "new title"
    const state = reducer(initialState, {type:ADD_EDIT_PROCESS_NAME,payload:newTitle})
    expect(state.currentProcess.title).toEqual(newTitle);

});
it('should cancel editing a process',() => {
    const initialState = reducer();
    initialState.showAddEditProcess = true;
    initialState.currentProcess = 'some process';
    const state = reducer(initialState,{type:CANCEL_PROCESS} )
    expect(state.currentProcess).toStrictEqual({});
    expect(state.showAddEditProcess).toBe(false);

});
it('should Delete a process when Delete process is called',() => {
    const initialState = reducer();
    initialState.processes = ['process1', 'process2'];
    const processToDelete = 'process1';
    const state = reducer(initialState,{type:DELETE_PROCESS, payload:processToDelete});
    expect(state.processToDelete).toStrictEqual('process1')
});


it('should Update the stage details when called',() => {
    const initialState = reducer();
    initialState.currentProcess = {title:'process 1', stages:[{}]};

    const state = reducer(initialState,{type:ADD_EDIT_STAGE_DETAILS, payload:{
            stageIndex:0,
            stageKey:'name',
            stageValue: 'Stage 1 prompt'
    }});
    expect(state.currentProcess.stages[0].name).toStrictEqual('Stage 1 prompt')
});


it('should add stage',() => {
    const initialState = reducer();
    initialState.currentProcess = {title:'process 1', stages:[{}]};
    const state = reducer(initialState,{type:ADD_STAGE});
    expect(state.currentProcess.stages.length).toBe(2)
});

it('should Update the stage details with choices when called',() => {
    const initialState = reducer();
    initialState.currentProcess = {title:'process 1', stages:[{}]};

    const state = reducer(initialState,{type:ADD_EDIT_STAGE_DETAILS, payload:{
            stageIndex:0,
            stageKey:'choices,0',
            stageValue: 'Multiple Choice option 1'
        }});
    expect(state.currentProcess.stages[0].choices[0].choice_text).toStrictEqual('Multiple Choice option 1')
});


it('should dispatch EDITOR_HOME_START w/ all processes  then  when initiateEditor', async () => {
    const dispatch = jest.fn()

    const result = 'some result'
    const url = `http://localhost:8080/editor/getAllProcesses`
    let _url

    const mockFetch = (url, method={}, body={}) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiateEditor(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDITOR_HOME_START})
    expect(dispatch).toHaveBeenCalledWith({type: EDITOR_HOME_SUCCESS, payload: result})
})
it('should dispatch SUBMIT_Process when we added a new processs', async() => {
    const dispatch = jest.fn();
    const getState = () => {
        return {
            editors: {} // update as per the state/selector
        }
    };
    const testProcess = [{process:'some process'}];
    const addUrl =`http://localhost:8080/editor/addProcess`
    let _url3
    const mockFetch = (url3, method='POST', body={testProcess}) =>{
        _url3 = addUrl;
        return new Promise(resolve => resolve({
            ok:true,
            json: () => new Promise(res => res(testProcess))
        }))
    }
    await initiateAddProcess(mockFetch)(dispatch, getState)
    expect(_url3).toBe(addUrl);
    expect(dispatch).toHaveBeenCalledWith({type:SUBMIT_PROCESS})
})
it('should dispatch SUBMIT_Process when we edited a  process', async() => {
    const dispatch = jest.fn();
    const getState = () => {
        return {
            editors: {currentProcess:{title:'new title',processId: 10,stages:[{}]}} // update as per the state/selector
        }
    };
    const testProcess = [{process:'some process', processId:12}];
    const {processId} = testProcess[0]
    const editUrl =`http://localhost:8080/editor/editProcess?processId=${processId}`
    let _url4
    const mockFetch = (url, method='PUT', body={testProcess}) =>{
        _url4 = editUrl;
        return new Promise(resolve => resolve({
            ok:true,
            json: () => new Promise(res => res(testProcess))
        }))
    }
    await initiateEditProcess(mockFetch)(dispatch, getState)
    expect(_url4).toBe(editUrl);
    expect(dispatch).toHaveBeenCalledWith({type:SHOW_ADD_EDIT_PROCESS,payload:testProcess})
    expect(dispatch).toHaveBeenCalledWith({type:SUBMIT_PROCESS})
});
it('should delete a process',async()=>{
    const dispatch = jest.fn();
    const getState = () => {
        return {
            editors: {
                processToDelete: 12
            } // update as per the state/selector
        }
    };
    const testProcesstoDelete ='some process'
    const {testId} = testProcesstoDelete;
    const deleteUrl = `http://localhost:8080/editor/deleteProcess?processId=12`
    let _url5
    const mockFetch = (url, method='PUT', body={testProcesstoDelete}) =>{
        _url5 = deleteUrl;
        return new Promise(resolve => resolve({
            ok:true,
            json: () => new Promise(res => res(testProcesstoDelete))
        }))
    }
    await initiateDeleteProcess(mockFetch)(dispatch, getState)
    expect(_url5).toBe(deleteUrl);
    expect(dispatch).toHaveBeenCalledWith({type:DELETE_PROCESS, payload:null})
})
it('should dispatch EDITOR_HOME_START w/ all finished processes   when Finished process button clicked', async () => {
    const dispatch = jest.fn()

    const result = [{processToken:{process:'someProcess'}}]
    const url = `http://localhost:8080/editor/getFinishedProcessFollowings`
    let _url2

    const mockFetch = (url) => {
        _url2 = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }
    await initiateFinishedProcessFollowings(mockFetch)(dispatch)
    expect(_url2).toBe(url)

    expect(dispatch).toHaveBeenCalledWith({type:UPDATE_FINISHED_PROCESSES, payload:[result[0].processToken.process]})
})