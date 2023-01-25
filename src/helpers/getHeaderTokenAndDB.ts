export default function getHeaderTokenAndDB() {
  if (
    window.localStorage.getItem("userToken") &&
    window.localStorage.getItem("db")
  ) {
    return {
      headers: {
        "x-auth-token": window.localStorage
          .getItem("userToken")
          ?.split(" ")[1] as string,
        "db-connection": window.localStorage.getItem("db") as string,
      },
    };
  } else {
    throw "Expiró la sesión";
  }
}
