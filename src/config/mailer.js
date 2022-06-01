const nodemailer = require("nodemailer")
const password = "ioam cwjl fdbr yeoo"

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "halo19fede@gmail.com", // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  transporter.verify().then( () => {
      console.log("ready for emails")
  })

module.exports = transporter