'use strict';

const StatusResponse = {
    CREATED: '201',
    OK: '200'
};

const ReasonResponse = {
    CREATED: 'Created',
    OK: 'Success'
};

class SuccessResponse {
    constructor({ message, statusCode = StatusResponse.OK, reasonStatusCode = ReasonResponse.OK, messageData = {} }) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.messageData = messageData;
    }

    send(res) {
        res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, messageData }) {
        super({ message, messageData });
    }
}

class Created extends SuccessResponse {
    constructor({ message, statusCode = StatusResponse.CREATED, reasonStatusCode = ReasonResponse.CREATED, messageData}) {
        super({ message, statusCode, reasonStatusCode, messageData });
    }
}

module.exports = { OK, Created };
