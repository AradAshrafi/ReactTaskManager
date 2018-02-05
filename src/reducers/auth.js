export default (state={},action)=>{
    switch(action.type){
        case "SET_AUTH":
            return {
                isAuth:action.isAuth
            };
        default:
            return state;
    }
}