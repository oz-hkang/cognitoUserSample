// const  AWS = require('aws-sdk');
// require('amazon-cognito-js');
global.fetch = require("node-fetch");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const prompt = require("prompt");

const poolData = {
  UserPoolId: "us-east-1_OjQeZ0WlS",
  ClientId: "4nup9t7ihvk8p4vi7lnuim88oa"
};
const dataEmail = {
  Name: "email",
  Value: "178693272@qq.com"
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

let attributeList = [];
let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
attributeList.push(attributeEmail);

let cognitoUser;

userPool.signUp("178693272@qq.com", "P@ssw0rd", attributeList, null, function(
  err,
  result
) {
    if (err) {
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log("register successed ,user name is " + cognitoUser.getUsername());
    // confirm the username
    console.log('Please input verification code: ');
    prompt.start();
    prompt.get(['verification_code'], function (err, result) {
        console.log('verification_code: ' + result.verification_code);
        prompt.stop();
        cognitoUser.confirmRegistration(result.verification_code.toString(), true, function (err, result) {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                return;
            }
            console.log('verification  result: ' + result);
        })

    })
})