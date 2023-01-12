export default function getHeaderDB() {
  if (window.localStorage.getItem("db")) {
    return {
      headers: {
        "db-connection": window.localStorage.getItem("db") as string,
      },
    };
  } else {
    console.log("No agarro la db");
    throw Error("DB desconectada");
  }
}
