
function createResult(error, data, message, code) {
    var result = {};
    if (!error) {
        result['status'] = true;
        result['message'] = message;
        result['data'] = data;
        result['code'] = code;
    } else {
        result['status'] = false;
        result['message'] = message;
        result['errors'] = error;
        result['code'] = code;
    }
    return result;
}

module.exports = {
    createResult: createResult,
}