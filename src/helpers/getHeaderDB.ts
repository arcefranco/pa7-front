export default function getHeaderDB() {
  if (window.localStorage.getItem("db")) {
    return {
      headers: {
        "db-connection": window.localStorage.getItem("db") as string,
      },
    };
  } else {
    throw "Expiró la sesión";
  }
}
