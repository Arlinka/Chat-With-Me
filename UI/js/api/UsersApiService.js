import * as apiConfig from "../constants/ApiConfig.js";
import localStorageKeys from "../constants/LocalStorageConstants.js";
import emailHelper from "../helpers/nameFromEmail.js";
import localStorageHelper from "../helpers/localStorageHelper.js";

export default async function fetchUsers() {
  let token = localStorageHelper({ key: localStorageKeys.token });

  if (!token) {
    return;
  }

  const response = await fetch(
    apiConfig.getEndpoint(apiConfig.endpointParams.usersParam),
    {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
      headers: apiConfig.headers,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!!data?.users?.length) {
        _setLocalStorage(data.users);
      }
      return data;
    });
  return response?.data;
}

function _setLocalStorage(data) {
  localStorageHelper({
    key: localStorageKeys.users,
    value: data.map((user) => emailHelper(user.email)),
  });
}
