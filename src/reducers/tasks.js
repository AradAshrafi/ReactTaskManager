
const defaultState=[];
export default (state=defaultState,action)=>{
    switch(action.type){
        // case "ADD_TASK":
        //     return [
        //         ...state,
        //         action.task
        //     ];
        // case "REMOVE_TASK":
        //     return state.filter((val)=> val.id!==action.id);
        // case "EDIT_EXPENSE":
        //     return state.map((val)=>{
        //         if(val.id==action.id){
        //             return {
        //                 ...val,
        //                 ...action.update
        //             };
        //         }
        //         else{ return val;}
        //     });
        case "SET_TASKS":
            return [
                ...action.tasks
            ]
        default:
            return state;
    }
} 