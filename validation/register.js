const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Le champ Nom est obligatoire";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Le champ Email est obligatoire";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email est invalide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Le champ mot de passe est obligatoire";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Le champ de confirmation du mot de passe est obligatoire";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit être au moins de 6 caractères";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passe doivent correspondre";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
