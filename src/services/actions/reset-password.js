import { baseUrl } from "../../utils/constants";
import {checkResponse, checkSuccess} from '../../utils/functions';

export const POST_NEW_PASSWORD_REQUEST = "POST_NEW_PASSWORD_REQUEST";
export const POST_NEW_PASSWORD_FAILED = "POST_NEW_PASSWORD_FAILED";
export const POST_NEW_PASSWORD_SUCCESS = "POST_NEW_PASSWORD_SUCCESS";

export function postNewPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: POST_NEW_PASSWORD_REQUEST,
    });

    fetch(`${baseUrl}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_NEW_PASSWORD_SUCCESS,
          });
          console.log(res);
          console.log(password, token);
        } else {
          dispatch({
            type: POST_NEW_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_NEW_PASSWORD_FAILED,
        });
      });
  };
}
