const defaultState = {
    isLoggedIn: false,
    username: undefined,
    password: undefined,
}
const authReducer = (state = {...defaultState},action) => {
    if(action.type === "logout-success")
        return defaultState;
    else if(action.type === "login-success"){
        return{
            ...action.payload,
            ...action.payload.userDetails,
            username: action.payload.sub,
            isLoggedIn: true,
        }
    }
    return state;
};

export default authReducer;