import nodemailer from "nodemailer";

export const sendEmail=async({receiverEmail,subject,message})=>{
    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        service:process.env.SMTP_SERVICE,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const options={
        from:process.env.SMTP_MAIL,
        to:receiverEmail,
        subject,
        text:message
    }
        try{
        await transporter.sendMail(options)
        }
        catch(err){
            console.log(err)
        }
}

