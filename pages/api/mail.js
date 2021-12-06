const sgmail = require('@sendgrid/mail');
sgmail.setApiKey(process.env.SEND_GRID_KEY);
export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case "POST":
            try {
                let emailObj = {
                    to: req.body.email,
                    from: 'support@bxmi.io',
                    subject: req.body.subject,
                    html: req.body.html,
                }
                let smsSuccess = await sgmail.send(emailObj);
                console.log("Signup Email Response:", smsSuccess);
                return res.status(200).json({ status: true });

            } catch (error) {
                return res.status(404).json({
                    success: false,
                });
            }
        default:
            res.setHeaders("Allow", ["POST"]);
            return res
                .status(405)
                .json({ success: false })
                .end(`Method ${method} Not Allowed`);
    }
};
