export const createSuccess = (statusCode, successMessage, data)=>{
    console.log("statusCodestatusCode"+statusCode)
    const successObj = {
        status:statusCode,
        message:successMessage,
        data:data
    }
    return successObj;
}
