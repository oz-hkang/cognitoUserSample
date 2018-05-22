# cognitoUserSample Contains the following
1.cognito  User Pool sign up 
2.cognito  User Pool confirm
3.cognito  User Pool sign in

The required
1.Users can use an email address as their "username" to sign up and sign in
2.User input email verified code after sign up
3.User sign in will check the phone_verified,if the phone_verified is false,fill the  phone number and then updated phone_verified

Problem

Only the username value is unique attribute.If you email as a username,the phone number do not guarantee uniqueness.
