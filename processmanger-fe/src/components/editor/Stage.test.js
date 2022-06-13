import {render,screen} from "@testing-library/react";
import Stage from "./Stage";
import userEvent from "@testing-library/user-event";
import {ADD_EDIT_STAGE_DETAILS} from "../../modules/editors";
it('should show edit stage name ',() => {
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Boolean',
        choices:[{
        choice_text:"some choice text"
        }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('Stage Name')).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText('Stage Name'));
    userEvent.paste(screen.getByLabelText('Stage Name')," new");
    expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex:0,stageKey:'name', stageValue:'some name new' }})

})
it('should show edit stage order ',() => {
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Boolean',
        choices:[{
            choice_text:"some choice text"
        }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('Stage Order')).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText('Stage Order'));
    userEvent.paste(screen.getByLabelText('Stage Order'),'1');
    expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex:0,stageKey:'stage_order', stageValue:'1' }})

})
it('should show edit stage type ',() => {
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Multiple Choice',
        choices:[{
            choice_text:"some choice text"
        }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('Select The Response Type')).toBeInTheDocument();
    // userEvent.clear(screen.getByLabelText('Select The Response Type'));
    // userEvent.paste(screen.getByLabelText('Select The Response Type'),'1');
    // expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS, payload:{stageIndex:0,stageKey:'stage_order', stageValue:'1' }})
});
it('should show Multiple Choice in the document',()=>{
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Multiple Choice',
        choices:[{
            choice_text:"some choice text"
        }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('Multiple Choice')).toBeInTheDocument();
});
it('should show Multiple Choice choice A in the document',()=>{
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Multiple Choice',
        choices:[{
            choice_text:"some choice text"
        }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('A')).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText('A'));
    userEvent.paste(screen.getByLabelText('A'),'A');
    expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS,payload:{stageIndex:0,stageKey:'choices,0',stageValue:'some choice textA'}})
})
it('should show Multiple Choice choice B in the document',()=>{
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Multiple Choice',
        choices:[{
            choice_text:"some choice text"
        },
            {
                choice_text:'B'
            }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('B')).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText('B'));
    userEvent.paste(screen.getByLabelText('B'),'B');
    expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS,payload:{stageIndex:0,stageKey:'choices,1',stageValue:'BB'}})
})
it('should show Multiple Choice choice C in the document',()=>{
    const dispatch =jest.fn();
    const stage = {name:'some name',stage_order:0,type:'Multiple Choice',
        choices:[{
            choice_text:"some choice text"
        },
            {
                choice_text:'B'
            },
            {
                choice_text:'C'
            }]}
    const currentProcess = {
        title:'process title',
        processId:0,
        stages:[stage]
    };
    const state ={editors:{currentProcess}}
    render(<Stage ind={0} _useSelector={fn => fn(state)}
                  _useDispatch={()=> dispatch}/>)
    expect(screen.getByLabelText('C')).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText('C'));
    userEvent.paste(screen.getByLabelText('C'),'C');
    expect(dispatch).toHaveBeenLastCalledWith({type:ADD_EDIT_STAGE_DETAILS,payload:{stageIndex:0,stageKey:'choices,2',stageValue:'CC'}})
})
