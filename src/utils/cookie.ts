export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any) {
  console.log("Куки начади работать");
  props = props || {};
  let exp = props.expires;
  console.log(exp);
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
    console.log(props.expires);
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  console.log(updatedCookie);
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
  console.log("Куки закончили работать");
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export function isTokenExpired(token: string | undefined) {
  if (token != undefined) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
