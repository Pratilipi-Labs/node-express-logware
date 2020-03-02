let config={level:"INFO",serviceName:""};

function RequestLogger(level,serviceName){
    config.level = level;
    config.serviceName = serviceName;
}

RequestLogger.prototype.log =  function (req,res,next) {
    res.on('finish', () => {
        let msg = {level:config.level,responseCode:res.statusCode,requestId:res.getHeader("request-id") ? res.getHeader("request-id") : "",serviceName:config.serviceName};
        if (config.level == "INFO" || (config.level == "ERROR" && res.statusCode >= 400)) {
            console.log(JSON.stringify(msg));
        }
    });
    next()
}

module.exports = RequestLogger;
