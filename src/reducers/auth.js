export default (state={},action)=>{
    switch(action.type){
        case "SET_AUTH":
            return {
                isAuth:action.isAuth,
                wallet:action.wallet,
                userId:action.userId
            };
        default:
            return state;
    }
}