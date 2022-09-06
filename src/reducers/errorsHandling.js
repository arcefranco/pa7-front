
export const errorsHandling = (error) => {

    window.location.replace(`/${error.response.status}`) 
}