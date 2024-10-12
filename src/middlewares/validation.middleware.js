export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };

    const validationResults = schema.validate(data, { abortEarly: false });

    if (validationResults.error) {
      const errorMessages = validationResults.error.details.map(
        (error) => error.message
      );
      return next(new Error(errorMessages, { cause: 400 }));
    }

    return next();
  };
};
