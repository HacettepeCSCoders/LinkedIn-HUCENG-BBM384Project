import {login} from "../api/apiCalls"
import jwt from 'jwt-decode'

export const logoutSuccess = () => {
    return {
      type: "logout-success"
    };
}

export const loginSuccess  = (auth) => {
    if(auth.role[0]==="ROLE_ACADEMICIAN"){
        return {
            type: "login-success",
            payload: auth,
        };
    }else if (auth.role[0]==="ROLE_STUDENT"){
        return {
            type: "login-success",
            payload: auth,
        };
    }else if(auth.role[0]==="ROLE_GRADUATE"){
        return {
            type: "login-success",
            payload: auth,
        };
    }else if(auth.role[0]==="ROLE_ADMIN"){
        return {
            type: "login-success",
            payload: auth,
        };
    }
}

export const loginHandler =  (auth) => {
    return async function(dispatch) {
        const response = await login(auth);
        const token =  response.data.access_token;
        const userDetails = response.data.userDetails;
        const isBanned = response.data.is_banned;
        const user = jwt(token);

        console.log(user);
        user.token = token;
        user.userDetails = userDetails;
        user.is_banned = isBanned;
        console.log(user.token);
        dispatch(loginSuccess(user));
        return response;

    }
}