//! ******** VALIDATE ZOD SCHEMA WITH REQUESTED DATA ******** !//

const validate = (schema) => async (req, res, next) => {
  // schema is nothing but (signUpSchema of zod validation) values
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const errorList = [];
    error.issues.map((err) =>
      errorList.push({ field: err.path[0], message: err.message })
    );
    const validateError = {
      status: 422,
      message: errorList,
      extraDetails: "Fill the input properly!",
    };
    next(validateError);
  }
};

export default validate;
