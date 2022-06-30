import {DELETE_PROCESS,initiateEditor} from "./editors";

export const FOLLOWER_START = 'followers/FOLLOWER_START'
export const FOLLOWER_SUCCESS = 'followers/FOLLOWER_SUCCESS'
export const FOLLOWER_HOME_START = 'followers/FOLLOWER_HOME_START'
export const FOLLOWER_HOME_SUCCESS = 'followers/FOLLOWER_HOME_SUCCESS'
export const PROCESS_START = 'followers/PROCESS_START'
export const UPDATE_PROCESS_TOKEN ='followers/UPDATE_PROCESS_TOKEN'
export const ANSWER_STAGE = "followers/ANSWER_STAGE"
export const SUBMIT = "followers/SUBMIT"
export const CANCEL = "followers/CANCEL"
export const UPDATE_PROCESS = "followers/UPDATE_PROCESS"
export const SHOW_ANSWER_PROCESS = "followers/SHOW_ANSWER_PROCESS"
export const SELECT_STAGE = "followers/SELECT_STAGE"
export const NEXT_STAGE = "followers/NEXT_STAGE"
export const GO_BACK = "followers/GO_BACK"
const initialState = {
    currentProcess:{},
    isFollower:false,
    fetching: false,
    processes:[],
    token:null
}
export default function reducer(state= initialState, action){


    switch(action?.type){
        case FOLLOWER_START:
            return {
                      ...state,
                      isFollower: true
                   }
        case FOLLOWER_SUCCESS:
            return {
                      ...state,
                      isFollower: false
                    }
        case FOLLOWER_HOME_START:
            return {
                     ...state,
                     fetching: true
            }
        case FOLLOWER_HOME_SUCCESS:
            return {
                     ...state,
                     fetching:false,
                processes: action.payload
            }
        case PROCESS_START:
            return{
                ...state,
                currentProcess: action.payload,
                showStartProcess: true
            }
        case UPDATE_PROCESS_TOKEN:
            return {
                ...state,
                currentProcess: {
                    ...state.currentProcess,
                    token: action.payload
                }
            }
        case SELECT_STAGE:{
            return  {
                ...state,
                currentProcess: {
                    ...state.currentProcess,
                },
                currentStage: action.payload
            }
        }
        case NEXT_STAGE: {
            return{
                ...state,
                currentStage: action.payload
            }
        }
        case ANSWER_STAGE:{

            return{
                ...state,
                currentStage: {
                    ...state.currentStage,
                    response: action.payload
                }
            }
        }
        case SUBMIT:
        case CANCEL:{
            return {
                ...state,
                currentStage: {},
                currentProcess: {},
                showStartProcess:  false


            }
        }
        case GO_BACK:{
            return {
                ...state,
                isFollower:false
            }
        }
        default:
            return{
                     ...state

                  }
    }
}
export function initiateFollower(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: FOLLOWER_HOME_START})
        const url = `http://localhost:8080/follower/getAllProcesses`
        const response = await _fetch(url)

        if (response.ok) {
            const result = await response.json()
            const processes = result.map(process=>{
                return {
                    ...process,
                    stages:process.stages.sort((a,b)=>{
                        return (a.order<b.order)? -1: 1
                    })
                }
            })
            dispatch({type: FOLLOWER_HOME_SUCCESS, payload: processes})
        }
    }
}

export function startProcess(_fetch = fetch) {
    return async function startProcessSideEffect(dispatch, getState) {
        const store = getState()
        const id = store.followers.currentProcess.id;
        if (!id) return;
        const url = `http://localhost:8080/follower/startProcess?processId=${id}`;
        try {
            const response = await _fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok) {
               const json = await response.text();
                dispatch({type: UPDATE_PROCESS_TOKEN, payload: json})
                //{token: "a13f-ad"}
            }
        } catch (e) {
            console.error(e)
        }
    }
}
export function answerStage(_fetch = fetch,token) {
    return async function answerStageSideEffect(dispatch,getState) {
        const store = getState()
        const {currentProcess, currentStage} = store.followers;
        const {token} = store.followers.currentProcess;
        const {id, response} = currentStage;
        const url = `http://localhost:8080/follower/answerAStage?token=${token}&stageId=${id}&response=${response}`

        try {
            const response = await _fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok) {
                const result = await response.text()
                const isLastStage = currentProcess.stages[currentProcess.stages.length-1].id===currentStage.id;
                if(isLastStage){
                    dispatch({type:SUBMIT})
                }else{
                    const currStageInd = currentProcess.stages.findIndex(stage=> stage.id === currentStage.id);
                    const nextStage = currentProcess.stages[currStageInd + 1];
                    dispatch({type:NEXT_STAGE,payload:nextStage});
                }
            }
        } catch (e) {
            console.error(e)
        }

    }
}