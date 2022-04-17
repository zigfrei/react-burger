export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function checkSuccess(res) {
  if (res && res.success) {
    return true;
  } else {
    return false;
  }
}
