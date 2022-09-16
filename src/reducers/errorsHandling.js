
export const errorsHandling = (error) => {
    console.log(error)
    window.location.replace(`/${error.response.status}`) 
}