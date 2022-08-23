export default function getHeaderToken() {
    if (window.localStorage.getItem('userToken')) {
       return {
          headers: {
             "x-auth-token": window.localStorage.getItem('userToken').split(" ")[1]
          }
       };
    }
 }