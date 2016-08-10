[![Build Status](https://travis-ci.org/forkgeeks/cloudwatch-logs-parser.svg?branch=master)](https://travis-ci.org/forkgeeks/cloudwatch-logs-parser)
[![Dependencies Status](https://david-dm.org/forkgeeks/cloudwatch-logs-parser.svg)](https://david-dm.org/forkgeeks/cloudwatch-logs-parser)
[![Coverage Status](https://coveralls.io/repos/github/forkgeeks/cloudwatch-logs-parser/badge.svg?branch=master)](https://coveralls.io/github/forkgeeks/cloudwatch-logs-parser?branch=master)

# Cloudwatch Stream Logs Parser
This will parse the cloudwatch logs stream into a more useful JSON format.

Enabling cloudwatch api logs streaming into lambda function results in string formatted logs which are not very useful for analysis. Here comes **Cloudwatch Stream Logs Parser** that extracts useful attributes into proper JSON object.

Original logs received from Cloudwatch look like:


```json
{
  "logStream": "XXXXXXXXXXXXXXXXXXXXXX",
  "messageType": "DATA_MESSAGE",
  "logEvents": [
    {
      "extractedFields": {
        "1": "Starting",
        "2": "execution",
        "3": "for",
        "4": "request:",
        "5": "XXXXXX-XXX-XXXX6-XXXX-XXXXXXXXX"
      },
      "timestamp": 1470111880329,
      "message": "Starting execution for request: XXXXXX-XXX-XXXX6-XXXX-XXXXXXXXX",
      "id": "XXXXXXXXXXXXXXXXX"
    },
    ...
    ...
    ...
    {
      "extractedFields": {
        "1": "Endpoint",
        "2": "request",
        "3": "headers:",
        "4": "{x-amzn-lambda-integration-tag=XXXXXXXXXXXXXXXXXXX,",
        "5": "Authorization=************************************************************************************************************************************************************************************************************************************************************************************************************************98d71c,",
        "6": "X-Amz-Date=20160802T042440Z,",
        "7": "x-amzn-apigateway-api-id=XXXXXXXXXXXXXXXXXXX,",
        "8": "X-Amz-Source-Arn=XXXXXXXXXXXXXXXXXXX,",
        "9": "Accept=application/json,",
        "10": "User-Agent=XXXXXXXXXXXXXXXXXXX,",
        "11": "X-Amz-Security-Token=XXXXXXXXXXXXXXXXXXX",
        "12": "TRUNCATED"
      },
      "timestamp": 1470111880335,
      "message": "Endpoint request headers: {x-amzn-lambda-integration-tag=XXXXXXXXXXXXXXXXXXX, Authorization=XXXXXXXXXXXXXXXXXXX, X-Amz-Date=20160802T042440Z, x-amzn-apigateway-api-id=XXXXXXXXXXXXXXXXXXX, X-Amz-Source-Arn=XXXXXXXXXXXXXXXXXXX, Accept=application/json, User-Agent=AmazonAPIGateway_xxxx, X-Amz-Security-Token=XXXXXXXXXXXXXXXXXXX}",
      "id": "XXXXXXXXXXXXXXXXXXX"
    }
    ...
    ...
    ...
```  

And here's the resulted outcome after parsing:

```json
  {
    "starting_execution_for_request": "079319da-5869-11e6-a27b-1bea4e50c6ac",
    ...
    ...
    "method_request_headers": {
      "accept": "*/*",
      "cloudfront_viewer_country": "CN",
      "cloudfront_forwarded_proto": "https",
      "cloudfront_is_tablet_viewer": "false",
      "cloudfront_is_mobile_viewer": "false",
      "user_agent": "python-requests/2.9.1",
      "x_forwarded_proto": "https",
      "cloudfront_is_smarttv_viewer": "false",
      "host": "api.ipstreet.com",
      "accept_encoding": "gzip deflate",
      "x_forwarded_port": "443",
      "via": "1.1 XXXXXX.cloudfront.net (CloudFront)",
      "x_api_key": "XXXXXX",
      "x_amz_cf_id": "XXXXXXX==",
      "x_forwarded_for": "101.150.89.42 54.240.156.158",
      "cloudfront_is_desktop_viewer": "true"
    },
    ...
    ...
```    


## Usage:

Run following command in your project directory for installation:
```javascript
npm install cloudwatch-logs-parser
```

Require the installed package in your EcmaScript(Javascript) file as below:
```javascript
let parser = require("cloudwatch-logs-parser");

console.log(parser(You_aws_log_string));
```

# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.0.9] - 2016-08-06

### Added
- Changelog section in README.md
- Mocha and chai for testing.
- test cases inside test/ dir.
- Travis CI integration
- StandardJs linter
- camelCase module.

### Changed
- renamed index.js into parser.js and placed inside lib/ dir.

### Removed
- function for fixingKey and using camelCase module now.

[Unreleased]: https://github.com/forkgeeks/cloudwatch-logs-parser/compare/v1.0.9...HEAD
[1.0.9]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...v1.0.9
