import reducer, {FOLLOWER_HOME_START, FOLLOWER_HOME_SUCCESS, initiateFollower} from "./followers";
import {FOLLOWER_START,FOLLOWER_SUCCESS} from "./followers"




it('should start with isFollower to false', () => {
    const state = reducer();
    expect(state.isFollower).toBe(false)
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
it('should start the follower home page when entered the Home page', () => {
    const initialState = reducer();
    initialState.fetching = false;
    const state = reducer(initialState, {type:FOLLOWER_HOME_START});
    expect(state.fetching).toBe(true);
});
it('should set fetching to false and give all processes',() => {
    const initialState = reducer();
    initialState.fetching = true;
    const processes = 'some Processes';
    const state = reducer(initialState, {type:FOLLOWER_HOME_SUCCESS, payload:processes})
    expect(state.fetching).toBe(false);
    expect(state.processes).toBe(processes);
});

it('should dispatch FOLLOWER_HOME_START w/ all processes  then  when initiateFollower', async () => {
    const dispatch = jest.fn()

    const result = 'some result'
    const url = `http://localhost:8080/follower/getAllProcesses`
    let _url

    const mockFetch = (url, method={}, body={}) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiateFollower(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: FOLLOWER_HOME_START})
    expect(dispatch).toHaveBeenCalledWith({type: FOLLOWER_HOME_SUCCESS, payload: result})
})