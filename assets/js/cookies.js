export function getCookie(name) {
  return getCookieFromString(document.cookie, name);
}

export function getCookieFromString(cookies, name) {
  const cookieArray = cookies.split(";");

  for (let cookie in cookieArray) {
    let key;
    let value;
    [key, value] = cookieArray[cookie].split("=");
    if (key && key.trim() === name) {
      return value.trim();
    }
  }

  return null;
}
