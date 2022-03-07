import * as apiConfig from "../constants/ApiConfig.js";
import localStorageKeys from "../constants/LocalStorageConstants.js";
import emailHelper from "../helpers/nameFromEmail.js";
import localStorageHelper from "../helpers/localStorageHelper.js";
import fetchUsers from "./UsersApiService.js";

export async function auth(email, password, { isLogin = true }) {
  const response = await fetch(
    apiConfig.getEndpoint(
      isLogin
        ? apiConfig.endpointParams.sighInParam
        : apiConfig.endpointParams.sighUpParam
    ),
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: apiConfig.headers,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data?.error?.code >= 400) {
        return console.log(
          "error: ",
          apiConfig.getErrorMessage(data.error.message)
        );
      }

      _setLocalStorage(data);
      _apiCallsAfterLogin();

      return data;
    });
  return response?.data;
}

function _setLocalStorage(data) {
  localStorageHelper({
    key: localStorageKeys.currentUser,
    value: emailHelper(data.email),
  });
  localStorageHelper({
    key: localStorageKeys.token,
    value: data.idToken,
  });
}

function _apiCallsAfterLogin() {
  fetchUsers();
}

auth("arlinka@tut.by", "123456", { isLogin: true });
