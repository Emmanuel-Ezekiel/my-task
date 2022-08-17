export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("UserToken"));

  if (user) {
    return { Authorization: "Bearer " + user };
  } else {
    return {};
  }
}
