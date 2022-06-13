export const EDITOR_START = 'editors/EDITOR_START'
export const EDITOR_SUCCESS = 'editors/EDITOR_SUCCESS'
export const FOLLOWER_START = 'editors/FOLLOWER_START'
export const FOLLOWER_SUCCESS = 'editors/FOLLOWER_SUCCESS'
export const UPDATE_PROCESSES = 'editors/UPDATE_PROCESSES'
export const UPDATE_FINISHED_PROCESSES = 'editors/UPDATE_FINISHED_PROCESSES'
export const EDITOR_HOME_START = 'editors/EDITOR_HOME_START'
export const EDITOR_HOME_SUCCESS = 'editors/EDITOR_HOME_SUCCESS'
export const SHOW_ADD_EDIT_PROCESS = "editors/SHOW_ADD_PROCESS"
export const ADD_EDIT_PROCESS_NAME = "editors/add/ADD_PROCESS_NAME"
export const ADD_EDIT_STAGE_DETAILS = "editors/add/ADD_STAGE_DETAILS"
export const CANCEL_PROCESS = "editors/add/CANCEL_PROCESS"
export const SUBMIT_PROCESS = "editors/add/SUBMIT_PROCESS"
export const ADD_STAGE = "editors/add/ADD_STAGE"
export const DELETE_PROCESS = 'editors/DELETE_PROCESS'
export const SHOW_FINISHED_PROCESSES = 'editors/SHOW_FINISHED_PROCESSES'

const initialState = {
    isEditor: false,
    isFollower: false,
    showAddEditProcess: false,
    showFinishedProcess: false,
    editProcess: {},
    processes: [],
    finishedProcesses: [],
    currentProcess: {title: '', processId: null, stages: []}
}

export default function reducer(state = initialState, action) {
    switch (action?.type) {
        case EDITOR_START:
            return {
                ...state,
                isEditor: true,
                isFollower: false,
            }
        case EDITOR_SUCCESS:
            return {
                ...state,
                isEditor: false,

            }
        case FOLLOWER_START:
            return {
                ...state,
                isFollower: true,
                isEditor: false
            }
        case FOLLOWER_SUCCESS:
            return {
                ...state,
                isFollower: false
            }
        case EDITOR_HOME_START:
            return {
                ...state,
                fetching: true
            }
        case EDITOR_HOME_SUCCESS:
            return {
                ...state,
                fetching: false,
                processes: action.payload
            }
        case UPDATE_PROCESSES:
            return {
                ...state,
                processes: action.payload
            }

        case UPDATE_FINISHED_PROCESSES:
            return {
                ...state,
                finishedProcesses: action.payload
            }
        case SHOW_ADD_EDIT_PROCESS: {
            return {
                ...state,
                showAddEditProcess: true,
                showFinishedProcess: false,
                currentProcess: {
                    title: action.payload.title || "",
                    processId: action.payload.id,
                    stages: action.payload.stages || [{
                        type: 'Boolean',
                        stage_order: 0
                    }]
                }
            }
        }
        case ADD_EDIT_PROCESS_NAME:
            return {//not taking new title
                ...state,
                currentProcess: {
                    ...state.currentProcess,
                    title: action.payload
                }
            }

        case ADD_EDIT_STAGE_DETAILS:
            const stages = [...state.currentProcess.stages];
            let key = action.payload.stageKey;
            let val = action.payload.stageValue;
            if (key.includes('choices')) {
                const keys = key.split(',')
                if (!stages[action.payload.stageIndex]["choices"]) {
                    stages[action.payload.stageIndex]["choices"] = [];
                }
                stages[action.payload.stageIndex][keys[0]][keys[1]] = {
                    ...stages[action.payload.stageIndex][keys[0]][keys[1]],
                    choice_text: val
                };
            } else {
                stages[action.payload.stageIndex][key] = val;
            }

            return {
                ...state,
                currentProcess: {
                    ...state.currentProcess,
                    stages
                }
            }

        case ADD_STAGE : {
            const stages = state.currentProcess.stages;
            stages.push({
                type: "Boolean",
                stage_order: stages.length,
            })
            return {
                ...state,
                currentProcess: {
                    ...state.currentProcess,
                    stages
                }
            }
        }
        case SUBMIT_PROCESS :
        case CANCEL_PROCESS : {
            return {
                ...state,
                currentProcess: {},
                showAddEditProcess: false,
                showFinishedProcess: false

            }
        }
        case DELETE_PROCESS: {
            return {
                ...state,
                processToDelete: action.payload
            }
        }
        case SHOW_FINISHED_PROCESSES : {
            return {
                ...state,
                showFinishedProcess: true,
                showAddEditProcess: false,

            }
        }
        default:
            return {
                ...state
            }
    }
}

export function initiateEditor(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: EDITOR_HOME_START})
        const url = `http://localhost:8080/editor/getAllProcesses`
        const response = await _fetch(url)

        if (response.ok) {
            const result = await response.json()
            dispatch({type: EDITOR_HOME_SUCCESS, payload: result})
        }
    }
}

export function initiateAddProcess(_fetch = fetch) {
    return async function addProcessSideEffect(dispatch, getState) {
        const store = getState();
        const process = store.editors.currentProcess;
        const url = `http://localhost:8080/editor/addProcess`;
        try {
            const addResponse = await _fetch(url, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                }, body: JSON.stringify({
                    ...process
                })
            });
            if (addResponse.ok) {
                const result = await addResponse.json();
                const resultId = result.id;
                // dispatch({type:SHOW_ADD_EDIT_PROCESS, payload:resultId});
                dispatch(initiateEditor());
                dispatch({type: SUBMIT_PROCESS})

            }
        } catch (e) {
            console.error(e)
        }

    }
}

export function initiateEditProcess(_fetch = fetch) {
    return async function editProcessSideEffect(dispatch, getState) {
        const store = getState();
        const process = store.editors.currentProcess;
        const {processId} = process;
        const url = `http://localhost:8080/editor/editProcess?processId=${processId}`;

        try {
            const editResponse = await _fetch(url, {
                method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                }, body: JSON.stringify({
                    ...process,
                    processId

                })
            });
            if (editResponse.ok) {
                const editResult = await editResponse.json();
                dispatch({type: SHOW_ADD_EDIT_PROCESS, payload: editResult});
                dispatch(initiateEditor());
                dispatch({type: SUBMIT_PROCESS})
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export function initiateDeleteProcess(_fetch = fetch) {
    return async function deleteProcessSideEffect(dispatch, getState) {
        const store = getState()
        const id = store.editors.processToDelete;
        if (!id) return;
        const url = `http://localhost:8080/editor/deleteProcess?processId=${id}`;
        try {
            const addResponse = await _fetch(url, {
                method: 'DELETE', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                }
            });
            if (addResponse.ok) {
                dispatch({type: DELETE_PROCESS, payload: null})
                dispatch(initiateEditor());
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export function initiateFinishedProcessFollowings(_fetch = fetch) {
    return async function sideEffect(dispatch) {

        // dispatch({type: EDITOR_HOME_START})
        const url = `http://localhost:8080/editor/getFinishedProcessFollowings`
        const response = await _fetch(url)

        if (response.ok) {
            const finishedResult = await response.json()
            const finishedProcesses = finishedResult.map(res => res.processToken.process)
            dispatch({type: UPDATE_FINISHED_PROCESSES, payload: finishedProcesses})
        }
    }
}