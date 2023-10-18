const { Router } = require("express");
const {
  validateRegisterInput,
  validateSignIn,
} = require("../validators/auth.validator");
const {
  signUp,
  signIn,
  refreshToken,
} = require("../controllers/auth.controller");
const { validator, ValidationSource } = require("../helpers/validator");
const { loginSchema } = require("../validators/auth.schema");
const Auth = require("../middleware/Auth");

const router = Router();

// router.use(checkApiKey);
// router.use(_requiredRole("ADMIN"));
// router.use(Auth.checkRole);

/**
 *  Router: auth
 */
router.post("/auth/signup", validateRegisterInput, signUp);
router.post(
  "/auth/signinwithusername",
  validator(loginSchema, ValidationSource.BODY),
  signIn
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Login',
            schema: { $ref: '#/definitions/LoginBody' }
    } */
);
router.post(
  "/auth/signin",
  validateSignIn,
  signIn
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Login',
            schema: { $ref: '#/definitions/LoginBody' }
    } */
);

router.get(
  "/auth/refreshtoken",
  Auth.authentication,
  refreshToken
  /*
    #swagger.security = [{
              "apiKeyAuth": []
      }] 
  */
);

module.exports = router;
