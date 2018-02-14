export const setAuth=(isAuth,wallet)=>({
    type:"SET_AUTH",
    isAuth,
    wallet
});
export const setUserId=(userId)=>{
    type:"SET_ID",
    userId
}