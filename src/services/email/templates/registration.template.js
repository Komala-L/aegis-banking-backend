const { sendEmail } = require("../email.service");

const sendRegistrationEmail = async (userEmail, name) => {
  const subject = "Welcome to Aegis Banking 🎉";

  const text = `
    Hello ${name},

    Welcome to Aegis Banking!

    Your account has been created successfully.

    You can now securely access your account and enjoy our banking services.

    If you did not create this account, please contact our support team immediately.

    Thank you for choosing Aegis Banking.

    Best regards,

    The Aegis Banking Team
    Secure • Reliable • Trusted
    `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;">
  
    <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Aegis Banking</h1>
        <p style="margin-top: 8px;">Secure • Reliable • Trusted</p>
    </div>

    <div style="padding: 30px;">
        <h2>Hello ${name}, 👋</h2>

        <p>
        Welcome to <strong>Aegis Banking</strong>!
        </p>

        <p>
        Your account has been successfully created. We're excited to have you with us.
        </p>

        <p>
        You can now securely access your account and enjoy our banking services.
        </p>

        <div style="background:#f8fafc;padding:15px;border-left:4px solid #2563eb;margin:25px 0;">
        <strong>Security Tip</strong><br>
        Never share your password or OTP with anyone. Aegis Banking will never ask for your password via email.
        </div>

        <p>
        If you did not create this account, please contact our support team immediately.
        </p>

        <p>
        Thank you for choosing Aegis Banking.
        </p>

        <p>
        Best regards,<br>
        <strong>The Aegis Banking Team</strong>
        </p>
    </div>

    <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:13px;color:#555;">
        © ${new Date().getFullYear()} Aegis Banking. All rights reserved.
    </div>

    </div>
    `;

  await sendEmail(userEmail, subject, text, html);
};

module.exports = { sendRegistrationEmail };