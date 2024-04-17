export const createAuthValidationSchema = {
  username: {
    isString: {
      errorMessage: 'The username must have type "string"',
    },
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: 'The length can be at least 5-32 characters.',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
  },
  email: {
    isString: {
      errorMessage: 'Email must have type "string"',
    },
    notEmpty: {
      errorMessage: "Email can't be empty",
    },
  },
};
