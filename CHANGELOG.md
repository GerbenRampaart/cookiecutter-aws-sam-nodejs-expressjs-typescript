NOTE: The 0.0.x versions are pre-beta. They might not work yet.

# v0.0.3
* Added tslint for the api
* Moved scripting to the proper directory
* Replaced some variables in the 'Output' of the template.yaml

# v0.0.2
* Added package.json for using npm scripting so we can run 'npm t' to test the template
    - Output will be place in the ./test directory (will be cleared before every test)
* Added 'scripts' folder with some helper scripting.
    - "npm run build" for deploying a project based on the cookiecutter template in ./test
    - "npm run start:api" for navigating to the deployed project and doing "sam local start-api"
* Temporarily move back to nodejs 8.10 because of buggy node 10. But this is temporary.
* Updated README.md
 
# v0.0.1
* Added the default template from the AWS SAM CLI for nodejs 10
    - https://github.com/awslabs/aws-sam-cli/tree/develop/samcli/local/init/templates/cookiecutter-aws-sam-hello-nodejs
* Updated the README with the initial goals of the project.
* Added changelog
* Added license