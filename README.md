# cognitoUserSample Contains the following
1.cognito  User Pool sign up <br>
2.cognito  User Pool confirm<br>
3.cognito  User Pool sign in<br>

# The required<br>
1.Users can use an email address as their "username" to sign up and sign in<br>
2.User input email verified code after sign up<br>
3.User sign in will check the phone_verified,if the phone_verified is false,fill the  phone number and then updated phone_verified <br>

# Problem<br>

Only the username value is unique attribute.If you email as a username,the phone number do not guarantee uniqueness.
