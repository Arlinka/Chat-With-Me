export const headers = {
  "Content-Type": "application/json",
};

export const endpointParams = {
  sighInParam: "signInWithPassword",
  sighUpParam: "signUp",
  usersParam: "lookup",
};

export const firebaseConfig = {
  apiKey: "AIzaSyA6hB8ARlxXtJ1bHoB8P-AaXHIH6wgtjrE",
  authDomain: "chat-js-c1117.firebaseapp.com",
  databaseURL: "https://chat-js-c1117-default-rtdb.firebaseio.com",
  endpoint: "https://identitytoolkit.googleapis.com/v1/accounts:",
  projectId: "chat-js-c1117",
  storageBucket: "chat-js-c1117.appspot.com",
  messagingSenderId: "563953812",
  appId: "1:563953812:web:5360e443ee43f20209b481",
  measurementId: "G-H43JDLWEBR",
};

export const firebaseErrors = {
  EMAIL_EXISTS: "The email address is already in use by another account",
  EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier.",
  INVALID_PASSWORD:
    "The password is invalid or the user does not have a password.",
  USER_DISABLED: "The user account has been disabled by an administrator.",
};

export function getEndpoint(param) {
  return `${firebaseConfig.endpoint}${param}?key=${firebaseConfig.apiKey}`;
}

export function getErrorMessage(message) {
  return Object.entries(firebaseErrors).find((entry) =>
    entry.includes(message)
  )[1];
}
