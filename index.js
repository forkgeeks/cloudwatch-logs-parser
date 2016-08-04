"use strict";

let REQ_HEAD_API=["X-Forwarded-Proto",
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

module.exports = function() {
    console.log("I am loaded");
}