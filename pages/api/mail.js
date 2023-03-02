import nodemailer from 'nodemailer';
export default async (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
        user: "complementme001@gmail.com",
        pass: "tunetbdaudhuimyy",
        },
    });
    const mailOptions = {
        from: "noreply@gmail.com",
        to: email,
        subject: `Message from ${name}`,
        html: `<p>${message}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: 'success' });
}