"use strict";

/**
 * Interested fields to be get extracted from request header string.
 */
let REQ_HEAD_API=[
    "X-Forwarded-Proto",
    "Host",
    "X-Forwarded-Port",
    "x-api-key",
    "X-Amz-Cf-Id",
    "X-Forwarded-For",
    "CloudFront-Is-Desktop-Viewer",
    "CloudFront-Viewer-Country",
    "CloudFront-Forwarded-Proto",
    "CloudFront-Is-Tablet-Viewer",
    "CloudFront-Is-Mobile-Viewer",
    "User-Agent"
]


let extract_headers = (param) => {
    let headers={}
    for (let prop in param){
        for (let header in REQ_HEAD_API){
            if(param[prop].startsWith(REQ_HEAD_API[header])){
                let key=REQ_HEAD_API[header].replace("/-/g","_")
                headers[key] = param[prop].replace(REQ_HEAD_API[header]+"=", "").slice(0,-1)
            }
        }
    }
    return headers
}

let convert_datetime = (param) => {
    //2016-08-02T04:25:19.517Z
    let date = new Date(param);
    // Hours part from the timestamp
    let hours = "0"+date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    let year = date.getFullYear();
    let month = "0"+date.getMonth();
    let day = "0"+date.getDay();
    // Will display time in 10:30:23 format
    let formattedTime = year+"-"+month.substr(-2)+"-"+day.substr(-2)+"T"+hours.substr(-2)+':'+minutes.substr(-2)+':'+seconds.substr(-2)+"Z";
    return formattedTime;
}

let create_model = (obj) => {
    let EXT_KEY="extractedFields"
    let TIME_KEY="timestamp"
    let REQ_HEADER="Method request headers: "
    let BODY_ORIG="Method request body before transformations: "
    let REQ_URI="Endpoint request URI: "
    let log=obj["logEvents"]

    let model= { 
        "logStreamId": obj["logStream"], 
        "requestId": log[0][EXT_KEY]["5"], 
        "resourceMethod": log[1][EXT_KEY]["3"], 
        "resourcePath": log[1][EXT_KEY]["6"], 
        "apiKey": log[2][EXT_KEY]["3"], 
        "reqHeaders":  extract_headers(log[5][EXT_KEY]), 
        "query": JSON.parse(log[6]["message"].replace(BODY_ORIG,"")), 
        "requestURI": log[7]["message"].replace(REQ_URI, ""), 
        "owner": obj["owner"], 
        "logGroup": obj["logGroup"], 
        "req_recevied_at": convert_datetime(log[0][TIME_KEY]), 
        "resp_dispatched_at":convert_datetime(log[15][TIME_KEY])
    }
    return model
}

module.exports = function(logStream) {
    return create_model(logStream);
}