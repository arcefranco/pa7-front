export default function getHeaderTokenAndDB() {
    if (window.localStorage.getItem('userToken')) {
       return {
          headers: {
             "x-auth-token": window.localStorage.getItem('userToken').split(" ")[1],
             "db-connection": window.localStorage.getItem('db')
             
          }
       };
    }else{
      console.log('No agarro el token')
    }
 }