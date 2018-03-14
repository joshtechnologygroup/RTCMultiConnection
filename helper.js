var request = require('request');

var ENVIRONMENT_URL_DICT = {
    "local": "http://localhost:8000/",
    "dev": "http://api.dev.calyxpod.com/",
    "staging": "http://api.staging.calyxpod.com/",
    "prod": "https://api.calyxpod.com/"
};

var path = "v3/api/company/validate-user-for-video-call/";

var helper = {

    makeAuthApiCall: function(token, roomId, userType, environment, socket, callback) {
        var baseUrl = ENVIRONMENT_URL_DICT[environment];
        request(
            baseUrl + path + "?room_id=" + roomId + "&user_token=" + token + "&user_type=" + userType,
            function (error, response, body) {
                if (error !== null && error !== undefined) {
                    return callback(new Error(error.toString()), false, socket);
                }

                return callback(undefined, response && response.statusCode === 200, socket);
            });
    }

};

module.exports = helper;
