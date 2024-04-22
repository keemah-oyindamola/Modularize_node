const nodemailer = require('nodemailer')

const mail = async (email, username)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"hikmotbolanle15@gmail.com",
            pass:"uhbmayuiqgvjuvrd"
        }
    })

    const messageTemplate = `
    <div>
        <h1 style="color:white;"> <strong>Dear ${username}</strong></h1>
        <h1>Welcome to college of ict <strong> ${username}</strong></h1>
    </div>
    `
    const mailoptions = {
        from:"hikmotbolanle15@gmail.com",
        to: email,
        subject:"Registration Message",
        text: 'Test App',
        html: messageTemplate
    }

    try {
        await transporter.sendMail(mailoptions)
        console.log('mail sent successful');
    } catch (error) {
        throw error
    }
}
module.exports= mail