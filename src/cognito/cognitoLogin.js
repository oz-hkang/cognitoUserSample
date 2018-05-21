global.fetch = require("node-fetch");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const prompt = require("prompt");

const poolData = {
  UserPoolId: "us-east-1_OjQeZ0WlS",
  ClientId: "4nup9t7ihvk8p4vi7lnuim88oa"
};

let authenticationData = {
  Username: "178693272@qq.com",
  Password: "P@ssw0rd"
};
let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
  authenticationData
);

let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let userData = {
  Username: "178693272@qq.com",
  Pool: userPool
};
let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function(result) {
    console.log("authentication successful!");

    // verified phone number
    if (!result.idToken.payload.phone_number_verified) {
      //require  phone_number verified
      var attributeList = [];
      var phone_numberAttr = {
        Name: "phone_number",
        Value: "+8613880030715"
      };
      var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(
        phone_numberAttr
      );
      attributeList.push(attribute);

      cognitoUser.updateAttributes(attributeList, function(err, result) {
        if (err) {
          console.log(err.message || JSON.stringify(err));
          return;
        }
        console.log("update phone number result: " + result);
        cognitoUser.getAttributeVerificationCode("phone_number", {
          onSuccess: function(result) {
            console.log("call result: " + result);
          },
          onFailure: function(err) {
            console.log(err.message || JSON.stringify(err));
          },
          inputVerificationCode: function() {
            let me = this;
            console.log("Please input verification code: ");
            prompt.start();
            prompt.get(["phone_number"], function(err, result) {
              console.log("phone_number: " + result.phone_number);
              cognitoUser.verifyAttribute(
                "phone_number",
                result.phone_number.toString(),
                me
              );
              prompt.stop();
            });
          }
        });
      });
    }
  },
  mfaRequired: function(codeDeliveryDetails) {
    // MFA is required to complete user authentication.
    // Get the code from user and call
    let me = this;
    console.log("Please input mfaCode code: ");
    prompt.start();
    prompt.get(["mfaCode"], function(err, result) {
      console.log("  mfaCode: " + result.mfaCode);
      prompt.stop();
      cognitoUser.sendMFACode(result.mfaCode, me);
    });
  },

  onFailure: function(err) {
    console.log("err", err);
  },
  newPasswordRequired: function(userAttributes, requiredAttributes) {
    console.log("User needs new password");
    console.log(userAttributes);
    console.log(requiredAttributes);
    delete userAttributes.email_verified;
    delete userAttributes.phone_number_verified;
    cognitoUser.completeNewPasswordChallenge(
      "P@ssw0rd123",
      userAttributes,
      this
    );
  }
});
