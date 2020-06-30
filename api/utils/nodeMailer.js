import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: "bigbuyau7@gmail.com",
    pass: 'backend123',
  },
});

 transport.verify().then((res) => console.log(res));

export function sendMailToUser(user, email, activationToken) {
  transport
    .sendMail({
      from: process.env.GMAIL,
      to: email,
      subject:
        "Email verification required for authenticating your Registration on BigBuy.com",
      html: `Click on this link to activate your account on <b>Big-Buy</b>  https://big-buy.herokuapp.com/api/user/accountactivation/${activationToken}?user=${user}`,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err.message));
}

export function forgotPasswordMailing(email, password) {
  transport
    .sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: `System generated password to login into Bigbuy.com`,
      html: `<p>This password is system generated password to login into your account on <b>BigBuy.com</b>. Please Login with this password and change your password in profile section if needed.</p>
        <h3>Password: ${password}`,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err.message));
}
