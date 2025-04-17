# sam-app

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- src - Code for the application's Lambda functions.
- template.yaml - A template that defines the application's AWS resources.

## Build and run locally the sample application

```bash
./build.sh
sam local start-api
```
Endpoint: http://127.0.0.1:3000
APIs
| Detail API    | METHOD        | ENDPOINT |
| ------------- | ------------- |------------- |
|Get describe global| GET | /api|
|Describe a sObject|GET|/api/:sObject/describe|
|Get all records of sObject|GET|/api/:sObject/list|
|Get record of sObject by id|GET|/api/:sObject/:id|
|Create record of sObject|POST|/api/:sObject|
|Update record of sObject by id|PATCH|/api/:sObject/:id|
|Get record of sObject by id|DELETE|/api/:sObject/:id|
