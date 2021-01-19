import * as actionTypes from "./actionTypes";
import axios from "axios";
import {
  osVersion,
  osName,
  browserVersion,
  deviceType
} from "react-device-detect";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, Logdate) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    Logdate: Logdate,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authsetImg = (img) => {
  return {
    type: actionTypes.SET_IMG,
    img: img,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000000);
  };
};
export const authLogin = (email, password) => {

  return (dispatch) => {
    dispatch(authStart());
    const authDate = {
      email: email,
      password: password,
      os_name: osName,
      os_version: osVersion,
      type: deviceType,
      app_version: browserVersion,
      model: 'ASUS'
    };
    // let history = useHistory();
    axios
      .post("https://apitest.i2-host.com/2.1/api/auth/login", authDate, {
        Headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        response.data.Logdate = new Date().getFullYear();
        const expirationDate = new Date(new Date().getTime() + response.data.Logdate * 100000);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("LogDate", response.data.Logdate);
        localStorage.setItem("Email", authDate.email);
        localStorage.setItem("Password", authDate.password);
        dispatch(
          authSuccess(response.data.access_token, response.data.Logdate)
        );
        dispatch(checkAuthTimeout(response.data.Logdate));
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };
}
export const auth = (name, email, password, password_confirmation) => {
  return (dispatch) => {
    // dispatch(authStart());
    const authDate = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    axios
      .post("https://apitest.i2-host.com/2.1/api/auth/signup", authDate, {
        Headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        // response.data.Logdate = new Date().getFullYear();
        // const expirationDate = new Date(new Date().getTime() + response.data.Logdate * 100000);
        // // dispatch({ type: actionTypes.AUTHENTICATE_THE_USER });
        // localStorage.setItem('expirationDate', expirationDate);
        // localStorage.setItem("token", response.data.access_token);
        // localStorage.setItem("LogDate", response.data.Logdate);

        // dispatch(
        //   authSuccess(response.data.access_token, response.data.Logdate)        );
        // dispatch(checkAuthTimeout(response.data.Logdate));
        console.log(response.data)
      })
      .catch((err) => {
        dispatch(authFail(err.message));
      });
  };



};
export const setAvatar = (img) => {
  return dispatch => {
    dispatch(authsetImg(img));
    localStorage.setItem('Img', img);
  }
}
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const Logdate = localStorage.getItem('Logdate');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, Logdate));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 100000));
      }
    }
  };
};