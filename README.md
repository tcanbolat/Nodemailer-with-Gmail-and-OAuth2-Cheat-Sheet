<h1 align="center">Nodemailer-with-Gmail-and-OAuth2-Cheat-Sheet</h1>

<p align="center">This App demonstrates how to set up Nodemailer using Gmail &amp; OAuth2.</p>
<p align="center">I built this tutorial since I ran into a lot of errors when first using nodeMailer with Gmail.</p>


<p align="center" >
  <a href="https://nodemailer.com/about/">
    <img height="100px" width="100px" src="logos/nodeMailer.png" alt="nodeMailer">
  </a>
  <img height="80px" width="80px" src="logos/plusSign.png"/>
  <a href="https://Gmail.com">
    <img height="100px" width="100px" src="logos/Gmail.png" alt="Gmail">
  </a>
  <img height="80px" width="80px" src="logos/plusSign.png"/>
  <a href="https://oauth.net/2/">
    <img height="120px" width="120px" src="logos/imageedit_1_3752143845.png" alt="OAuth2">
  </a>
</p>
<br/>

___
___

<h1 align="center">Breakdown of Instructions</h1>
<h4 align="center">Part One: Create a new app</h4>
<h4 align="center">Part Two: Obtain Gmail OAuth2</h4>
<h4 align="center">Part Three: Run app!</h4>


___
___


<h2 align="center">Part One</h2>
<p align="center">Create new App</p>

```
- Clone repo to local drive
- npm install
```
<strong>OR</strong>
<strong>create a new folder</strong>
```
- touch app.js
- npm init
- npm install nodemailer
```
<strong>within app.js add the dependencies.</strong>
```javaScript
const nodemailer = require("nodemailer");
```
<strong>next create a output variable that will contain your message.</strong>
```javaScript
const output = `
  <h1>New Messsage!<h1>
  <p>I hope this works.</p>
`;
```
<strong>Now create the transporter function.</strong>
<strong>This function is where you will add in your OAuth2 credentials further down.</strong>

```javaScript
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
   type: "OAuth2",    // defining the authentication type
   clientId: "************",    // this will be obtained in part 2
   clientSecret: "************",    // this will be obtained in part 2     
  },
});
```

<strong>in the same file under the transporter function, create a mailOptions variable.</strong>

```javaScript
let mailOptions = {
  from: "Your nodeMailer app!",   // You can change this to whatever you like. !this is NOT where you add in the email address!
  to: "example@gmail.com",    // Use your same googele email ("send yourself an email") to test if the app works.
  subject: "Testing123...",   // change the subject to whatever you like.
  html: output,   // this is the output variable defined earlier that contains our message.
  auth: {
   user: "example@gmail.com",   // replace this with your google email
   refreshToken: "************",    // this will be obtained in part 2 
   accessToken: "************",    // this will be obtained in part 2 
   expires: new Date().getTime(),  // this will request a new token each time so that it never expires. google allows up to 10,000 requests per day for free.
  },
};
```

<strong>Finally, create the function that will send your email!</strong>

```javaScript
transporter.sendMail(mailOptions, (error, info) => {  
  if (error) {
    console.log(error);   // if anything goes wrong an error will show up in your terminal.
  } else {
      console.log("Message sent: %s", info.messageId);    // if it's a success, a confirmation will show up in your terminal.
    }
});
```

___
___


<h2 align="center">Part Two</h2>
<p align="center">Obtain OAuth2 credentials</p>

<ul>
<li>head on over to: https://console.developers.google.com/</li>
<li>Click on Select a project in the top left corner.</li>
<li>A pop up will appear, click on NEW PROJECT</li>
<li>Create a name for your project</li>
  
___


<li>You will then be redirected back to the dashboard</li>
<li>To the left of the screen, click on "OAuth consent screen"</li>
<li>Click on external, then add in you app name again in the input field, THEN click the blue save button at the bottom of the page</li>
  
___


<li>To the left of the screen, click on credentials</li>
<li>Then, click on "+ CREATE CREDENTIALS" and select "OAuth client ID"</li>
<li>Choose Web Application, THEN! in the "Authorized redirect URIs" input field copy/paste this link: https://developers.google.com/oauthplayground </li>
<li>Click on create, might have to click twice"</li>
  
___


<li>You will be redirected to a pop up that has your client ID and client secret</li>
<li>Add these credentials to your transporter function!</li>
  
___


<li>Head on over to https://developers.google.com/oauthplayground</li>
<li>Click on the setting button to the right</li>
<li>Click on "Use your own OAuth credentials" and then add your client ID as well as your client secret in the input fields</li>
<li>Dont close out of settings!</li>
  
___


<li>To the left, in the input filed add in "https://www.googleapis.com/auth/gmail.send" and click Authorize API's</li>
<li>this will only allow the app to send emails and nothing else</li>
<li>When you get redirected if the pop up asks what account you want to use, choose the one that you want to send emails with, if not then that means you only have one google account setup on your machine.</li>
  
___


<li>You will then see a pop up with a red ALERT!, this is only asking if we want the app to access our gmail account</li>
<li>Just click on Advanced to the left, and click on the very bottom link that has your appname(unsafe)
<li>Dont worry, its only alerting you because google hasn't verified your app that you just created in developers.google</li>
<li>Click on allow and you will be redirected back to the OAuth screen</li>
  
___


<li>Here, click on the "Exchange authorization code for tokens" and your tokens will be generated below</li>
<li>It might automatically switch to the next tab, if so just click on the earlier tab for Exchange Authorization tokens</li>
  
___


<li>Now, take the access token and the refresh token and add them to your transporter function</li>
<li>Congrats! Your app is all set up to start sending emails using OAuth2!</li>
</ul>


___
___


<h2 align="center">Part Three</h2>
<p align="center">Run App!</p>

<p>If you haven't already, add in your OAuth2 credentials to the transporter function.</p>
<p>In your terminal run</p>

```javaScript
node app.js
```

<p>You should now see an error or a confirmation in the terminal.</p>
<p>If you got a Confirmation, go on over to your Gmail inbox and you should see the email that your app just sent.<p>

___
___


<h2>ADVICE!</h2>
<h4>Make sure to hide your OAuth2 credentials before you push your code to GitHub or anywhere else.<h4>
<h4>Look up "dotenv" npm module to hide your variables locally. https://www.npmjs.com/package/dotenv<h4>
  

<h2>Troubleshooting</h2>
<p>If your still running into trouble, try some of these steps<p>
<ol>
  <li>Go to https://accounts.google.com/b/0/DisplayUnlockCaptcha and click on continue. then go back and try sending the email through         your app again, at least twice.
  </li>
  <li>You can also allow more access to your app, earlier we copy/pasted https://www.googleapis.com/auth/gmail.send so that we could allow the app to send emails using our google credentails. Instead go back and change it to https://www.googleapis.com/auth/gmail. This will give your app more access to your gmail and maybe solve your error.
  </li>
  <li>If your getting an error about your login being invalid, Your Gmail password might be to weak for OAuth2 and its not letting you go through. Try changing your password and it might solve the issue. (this fixed my issue).
  </li>
  <li>You can also try allowing less secure apps to access your google account, but that would defeat the purpose of OAuth2 and leave you potentially vulnerable. If you want to test it out, go over to https://myaccount.google.com/lesssecureapps and toggle to allow.
  </li>
</ol>

___
___

<h5>Written by Abdullah Canbolat<h5>
<h5>https://github.com/tcanbolat<h5>
