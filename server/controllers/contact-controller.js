import ContactCollection from "../models/contact-form-model.js";

const contactController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, address, message } = req.body;

    //? User can contact without registration. But if user already present in contact collection then we just add the new query in message array. Else we are creating a new contact details.
    const userExistInContactSchema = await ContactCollection.findOne({
      email,
    });
    if (userExistInContactSchema) {
      //* If message present in message list then we are send a respond like Your message is already exists!
      if (userExistInContactSchema.message.includes(message)) {
        const messageSimilarError = {
          status: 400,
          extraDetails: "Your message is already exists!",
        };
        next(messageSimilarError);
      } else {
        //* If user's message is new one the we just push that new message into message list.
        await ContactCollection.findOneAndUpdate(
          { email },
          { $push: { message } },
          { useFindAndModify: false }
        );
        res.status(201).json({
          message: "Congratulations! Your message has been sent successfully.",
        });
      }
    } else {
      const createContactDetails = await ContactCollection.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        message: message.trim(),
      });

      res.status(201).json({
        message: "Congratulations! Your message has been sent successfully.",
      });
    }
  } catch (err) {
    const catchError = {
      status: 500,
      extraDetails: "Internal Server Error",
    };
    next(catchError);
  }
};

export default contactController;
