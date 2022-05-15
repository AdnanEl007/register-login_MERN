const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email est obligatoire";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email non valide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Mot de Passe est obligatoire";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
