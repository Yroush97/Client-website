import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

//JS Object
const initialState = {
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    Logdate: null,
    img: ''
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false,
        Logdate: action.Logdate,

    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null });
};
const authsetImg = (state, action) => {
    return updateObject(state, { img: action.img });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_IMG: return authsetImg(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;