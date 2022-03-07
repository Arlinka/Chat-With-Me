export function showPassword(target, id) {
  let input = document.getElementById(id);
  if (input.getAttribute("type") == "password") {
    target.classList.remove("fa-eye");
    target.classList.add("fa-eye-slash");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("fa-eye-slash");
    target.classList.add("fa-eye");
    input.setAttribute("type", "password");
  }
  return false;
}
