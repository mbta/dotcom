export function getCookie(name) {
  return getCookieFromString(document.cookie, name);
}

export function getCookieFromString(cookies, name) {
  const cookieArray = cookies.split(";");

  let cookieHash = {};
  for (let cookie in cookieArray) {
    let key;
    let value;
    [key, value] = cookieArray[cookie].split("=");
    cookieHash[key.trim()] = value.trim();
  }

  return cookieHash[name];
}
