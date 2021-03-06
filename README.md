# Introduction
This project provides a comprehensive template for nodejs 10.x which can be used with the AWS SAM cli.

It focusses on implementing best practices when generating, developing, building and deploying complete apis and/or web applications to AWS Lambda.

## Requirements
* [NodeJS 10.10+ installed](https://nodejs.org/en/download/releases/)
* [AWS SAM CLI](https://github.com/awslabs/aws-sam-cli)

## Usage
Generate a boilerplate template in your current project directory using the following syntax:
* `sam init -l https://github.com/GerbenRampaart/cookiecutter-aws-sam-nodejs-expressjs-typescript.git`

# Goals
* This project will look at other nodejs/expressjs/typescript templates (like from Yeoman) to create a project layout that is rich enough to get started with, is intuitive and uses npm packages which are mature and well-supported.
* It will include the latest Typescript at every release.
* It will focus on the latest nodejs supported by Lambda. Right now that is "nodejs10.x". The tsconfig.json will reflect that by outputting ecma2018 script which feature set is supported by nodejs 10. See https://kangax.github.io/compat-table/es2016plus/
* ~~Openapi3 will be used to document the api and the cloudformation yaml will reflect that by creating a proxy in the AWS API Gateway based upon that openapi definition.~~
    - I wanted a clear documentation interface for the template project but as it turns out it's better to configure the Api endpoints in the cloudformation "AWS::Serverless::Function" section and then ask AWS after deployment for the openapi of postman collection.
* It will include a cloudformation yaml to create reproducible artifacts and of course it will support "sam local" (and all other sam features for that matter)
* It will include a buildspec yaml to support a ci/cd when commiting to AWS CodeCommit. Other build tools may be included later but right now it's AWS focussed.
* It will include a way to start the app in a non-SAM context. So you most likely will start it with "sam local" but you can also start it with "npm start" which will start an express listener in app.local.js which SAM ignores. 
* It will include a Dockerfile to start this application using pm2 and just have it be a app disconnected from Lambda. (using earlier said "app.local.js")
    - Note that these are just goodies, the core purpose of this project is to be AWS SAM and Lambda friendly.
* It will use Jest and supertest for unit and integration testing
* It will include the ability to use your favorite web framework to host a web application using express and nodejs. 
    - The project will generate an "api" directory containing your expressjs api.
    - It will also generate a "web" directory which will contain a (React) web project.
    - The "web" project contains a freshly generated React app which is totally unmodified.
    - During the "sam package" the project will do a production build on the React app and copies the resulting build (just html/css/js) for the api to statically host.
    - Important to note that letting expressjs host your app isn't as fast and efficient as using S3 or nginx but the ease of use of Lambda allows us to scale both our api and web app (probably a SPA using that same api) infinitely. Optimizing this architecture by letting the web app recide in a separate hosting environment sacrifices ease of use. 
* This is a cookiecutter template so you can always use it straight from the SAM CLI, like:
    - sam init --location https://github.com/GerbenRampaart/cookiecutter-aws-sam-nodejs-expressjs-typescript.git
* PLEASE SUGGEST OTHER GOALS :)

## Start kit 
These is the example code I wish to include in the starter kit (all in Typescript and expressjs):
* An example graphql api controller in expressjs
* An example controller which does some client communication over websockets
* An example controller doing IO to and from dynamodb

# Development

## Testing
* Clone/fork this repo
* npm install
* "npm run build" will run the cookiecutter template with defaults and place the result in "./test"
* "npm run start:api" will start the api using sam in the "./test"

# Credits
* This project has been generated with [Cookiecutter](https://github.com/audreyr/cookiecutter)

