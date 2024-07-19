import { SMTP_MAIL } from "../config/envConfig.js";
import { contactQueryEmailTemplate, mailTransport } from "../utils/mail.js";

const contactController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, address, message } = req.body;

    if (
      firstName.length < 3 ||
      firstName.length > 30 ||
      lastName.length < 3 ||
      lastName.length > 30
    ) {
      const nameError = {
        status: 400,
        message: "Fistname Or Lastname invalid",
        extraDetails: "Fistname or Lastname must be 4 to 30 characters long",
      };
      return next(nameError);
    }

    // Valid phone number
    if (
      !phone.match(
        /^\+?(?:\d{1,4})?[-.\s]?(?:\(?\d{1,4}\)?[-.\s]?)?(?:\d{1,4}[-.\s]?){1,4}\d{1,9}$/
      )
    ) {
      const phoneError = {
        status: 400,
        message: "Invalid phone number",
        extraDetails: "Please provide a valid phone number",
      };
      return next(phoneError);
    }

    // We are sending these details to my email address
    mailTransport().sendMail({
      from: email,
      to: SMTP_MAIL,
      subject: "CONTACT QUERY FROM SHIBAJI WEBSITE",
      html: contactQueryEmailTemplate(
        firstName,
        lastName,
        email,
        phone,
        address,
        message
      ),
    });

    res.status(201).json({
      message: "Congratulations! Your message has been sent successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

export default contactController;
