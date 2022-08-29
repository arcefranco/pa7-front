export default function getHeaderToken() {
    if (window.localStorage.getItem('userToken')) {
      console.log('token del front: ', window.localStorage.getItem('userToken').split(" ")[1])
       return {
          headers: {
             "x-auth-token": window.localStorage.getItem('userToken').split(" ")[1]
          }
       };
    }else{
      console.log('No agarro el token')
    }
 }