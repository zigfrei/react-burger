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




// сбрасываем время чтобы можно было сравнить
function dropHMS(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
};


export function orderDate(orderDate) {
  let today = new Date(),
    yesterday = new Date(),
    roomLastMessageDate = new Date(orderDate);

  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);
  dropHMS(roomLastMessageDate);

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];
  const dateMinutes = ('0'+ orderDate.getMinutes()).slice(-2);
  const timeZone = orderDate.getTimezoneOffset()/60 < 0 ? `i-GMT+${-orderDate.getTimezoneOffset()/60}` : `i-GMT-${-orderDate.getTimezoneOffset()/60}`;
  const dateMonth = months[orderDate.getMonth()];

  if (orderDate) {
    if (today.getTime() === roomLastMessageDate.getTime()) {
      return `Сегодня, ${orderDate.getHours()}:${dateMinutes} ${timeZone}`
    } else if (yesterday.getTime() === roomLastMessageDate.getTime()) {
      return `Вчера, ${orderDate.getHours()}:${dateMinutes} ${timeZone}`
    }  else {
      return `${orderDate.getDate()} ${dateMonth} ${orderDate.getFullYear()}, ${orderDate.getHours()}:${dateMinutes} ${timeZone}`;
    }
  };
};
