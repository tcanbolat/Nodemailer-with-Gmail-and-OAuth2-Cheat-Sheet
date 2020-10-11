const nodemailer = require("nodemailer");

const output = `
  <h1>New Messsage!<h1>
  <p>I hope this works.</p>
`;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
     type: "OAuth2",    // defining the authentication type
     clientId: "************",    // this will be obtained in part 2
     clientSecret: "************",    // this will be obtained in part 2
    }
  });
  
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

  transporter.sendMail(mailOptions, (error, info) => {  
    if (error) {
      console.log(error);   // if anything goes wrong an error will show up in your terminal.
    } else {
        console.log("Message sent: %s", info.messageId);    // if it's a success, a confirmation will show up in your terminal.
      }
  });
