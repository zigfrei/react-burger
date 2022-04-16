import { baseUrl } from "../../utils/constants";

export const POST_PASSWORD_RESET_REQUEST = "POST_PASSWORD_RESET_REQUEST";
export const POST_PASSWORD_RESET_FAILED = "POST_PASSWORD_RESET_FAILED";
export const POST_PASSWORD_RESET_SUCCESS = "POST_PASSWORD_RESET_SUCCESS";

export function postPasswordReset(email) {
  return function (dispatch) {
    dispatch({
      type: POST_PASSWORD_RESET_REQUEST,
    });
    fetch(`${baseUrl}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          console.log('action');
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.statusText}`);
      })
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem('resetToken', true);
          console.log('action');
          dispatch({
            type: POST_PASSWORD_RESET_SUCCESS,
            passwordReset: res.success,
          });
          console.log(res);
        } else {
          dispatch({
            type: POST_PASSWORD_RESET_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_PASSWORD_RESET_FAILED,
        });
      });
  };
}
