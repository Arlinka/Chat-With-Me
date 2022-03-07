export default function emailHelper(email) {
  return email.substring(0, email.lastIndexOf("@"));
}
