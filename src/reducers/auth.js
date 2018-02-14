export default (state={},action)=>{
    switch(action.type){
        case "SET_AUTH":
            return {
                isAuth:action.isAuth,
                wallet:action.wallet
            };
        case "SET_ID":
            return {
                ...state,
                userId:action.userId
            };
        default:
            return state;
    }
}