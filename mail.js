const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

// Step 3: Configure the transporter (Replace with your SMTP service)
let transporter = nodemailer.createTransport({
  service: "mailgun", // or use your own email service
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  tls: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Step 4: Setup handlebars engine options
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./templates/partials"), // Directory for partials
    layoutsDir: path.resolve("./templates/layouts"), // Directory for layouts
    defaultLayout: "main", // Default layout file
  },
  viewPath: path.resolve("./templates"),
  extName: ".handlebars",
};

// Step 5: Use handlebars template engine with nodemailer
transporter.use("compile", hbs(handlebarOptions));

// Step 6: Define the email options
const mailOptions = {
  from: {
    name: process.env.MAIL_FROM_ADDRESS_NAME,
    address: process.env.MAIL_FROM_ADDRESS,
  },
  to: "mrmusonant@gmail.com",
  subject: "Test Email with Handlebars Template",
  template: "welcome", // name of the template file (without extension)
  context: {
    title: "Welcome to Tatami",
    heading: "Welcome to Tatami",
    name: "John",
    // message: "This is a test email using Handlebars template engine.",
    loginUrl: "#",
  },
};

// Step 7: Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Email sent: " + info.response);
});
