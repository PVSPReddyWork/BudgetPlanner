const CreateReponseObject = (statusCode, statusMessage, responseObject) => {
    let response = {};
    try {
        responseObject = {
            status_code: statusCode,
            status_message: statusMessage,
            response_data: responseObject
        }
        response = responseObject;
    }
    catch (error) {
        ErrorEventLogger(error);
    }
    return response;
}

export { CreateReponseObject };