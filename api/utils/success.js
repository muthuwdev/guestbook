export const createSuccess = (statusCode, successMessage, data)=>{
    console.log("statusCodestatusCodeeeeeeeeee"+successMessage)
    const successObj = {
        status:statusCode,
        message:successMessage,
        data:data
    }
    return successObj;
}
