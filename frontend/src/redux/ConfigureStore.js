import {legacy_createStore as createStore , applyMiddleware, compose} from "redux"
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";

const securels = new SecureLS();


const getStateFromStorage = () => {
    const hoaxAuth = securels.get("hoax-auth");
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        password: undefined,
    }
    if(hoaxAuth){
        try {stateInLocalStorage = hoaxAuth;}
        catch (error) {
        }
    }
    return stateInLocalStorage;
}

const updateStateInStorage = (newState) => {
    securels.set("hoax-auth",newState);
}
const configureStore = () => {
    const initalState = getStateFromStorage();
    setAuthorizationHeader(initalState);
    const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer,getStateFromStorage(),composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() =>{
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}
export default configureStore