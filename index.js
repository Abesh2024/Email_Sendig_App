const nodemailer = require("nodemailer");
const express = require("express");
const nodemon = require("nodemon");
require("dotenv").config();



const app = express()

app.use(express.json())

app.use(express.urlencoded());
// const nodemailer = require("nodemailer");

// require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 666,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(to, subject) {

  const payload = {
    from: "abeshmernstack@gmail.com",
    to,
    subject,
    html: `<h1>hello there</h1>`
  }

  transporter.sendMail(payload, (err, data) => {

    if (err) {
      console.log(err)
    } else {
      console.log("Email is sent to ", to)
    }

  })

}

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Form</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }
  
          .form-container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              width: 300px;
          }
  
          form {
              display: flex;
              flex-direction: column;
          }
  
          label {
              margin-bottom: 5px;
              color: #333;
          }
  
          input[type="email"],
          input[type="text"],
          textarea {
              padding: 10px;
              margin-bottom: 15px;
              border: 1px solid #ccc;
              border-radius: 4px;
              width: 100%;
              box-sizing: border-box;
          }
  
          button {
              padding: 10px 15px;
              background-color: #007BFF;
              border: none;
              border-radius: 4px;
              color: #fff;
              cursor: pointer;
              font-size: 16px;
          }
  
          button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="form-container">
          <form action="/send-email" method="post">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
  
              <label for="subject">Subject:</label>
              <input type="text" id="subject" name="subject" required>
  
              <label for="message">Message:</label>
              <textarea id="message" name="message" rows="5" required></textarea>
  
              <button type="submit">Send Email</button>
          </form>
      </div>
  </body>
  </html>
  
  `)
})

app.post('/send-email', async(req, res) => {
  await sendEmail(req.body.email, req.body.subject, req.body.message)
   console.log("test1");
 
   res.send({ email: "Email sent !" })
 
 })

// module.exports = sendEmail;

app.listen(3000, () => {
  console.log("Port is running at 3000");
})