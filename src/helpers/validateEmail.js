export default function validateEmail(value) {
    let validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 
    return validRegex.test(value);
 }