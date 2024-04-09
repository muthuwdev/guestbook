export const createError = (status, message)=>{
    const error = new Error();
    error.satatus = status;
    error.message = message;
    return error;

}