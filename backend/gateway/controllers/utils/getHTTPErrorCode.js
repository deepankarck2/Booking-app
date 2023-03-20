/**
 * Returns the status code of the error 
 * @param {*} err axios error 
 */
function getHTTPErrorCode(err) {
    if (!err || !err.response) return 500;

    return err.response.status;
}

module.exports = getHTTPErrorCode;