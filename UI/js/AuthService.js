import * as authConfig from "./AuthConfig.js";

export async function auth(email, password, isLogin) {
  const response = await fetch(authConfig.getEndpointSignIn(isLogin), {
    method: "POST",
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: authConfig.headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data?.error?.code >= 400) {
        return console.log(
          "error: ",
          authConfig.getErrorMessage(data.error.message)
        );
      }
      return console.log(data);
    });
  return response?.data;
}

auth("arlinka@tut.byy", "123456", { isLogin: true });
