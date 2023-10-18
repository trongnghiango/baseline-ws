const express = require("express");
const { SuccessResponse } = require("../core/ApiResponse");
const { putComment } = require("../controllers/comment.controller");
const { validateCommentInput } = require("../validators/comment.validator");

const Auth = require("../middleware/Auth");
const { _requiredRole } = require("../helpers/role");
const { validator } = require("../helpers/validator");
const { checkSchema } = require("../validators/check.schema");
const logger = require("../../../utils/logger");

// main router v1;
const router = express.Router();

/**
 * GET method
 * @path("/checkhealth")
 */
router.get(
  "/checkhealth",
  async (req, res) => {
    new SuccessResponse("success", { msg: "OK con dê!!" }).send(res);
  }
  // #swagger.tags = ['Status']
);
/**
 * Router: auth
 */
router.use(
  "/",
  require("./auth.route")
  // #swagger.tags = ['Auth']
);

/**
 * Router: user
 */
router.get(
  "/me",
  Auth.authentication,
  _requiredRole("ADMIN"),
  Auth.checkRole,
  validator(checkSchema),
  (req, res) => {
    logger.info(req.currentRoleCodes);
    res.json({
      status: "success",
      msg: "OK",
      data: {},
    });

    /*
     #swagger.tags = ['User']
     #swagger.security = [{
              "apiKeyAuth": []
      }] 
      */
  }
);

/**
 * Router: comment
 */
router.post(
  "/comment",
  validateCommentInput,
  putComment
  // #swagger.tags = ['Comments']
);

/**
 * Router: for Admin
 */
// router.post('/admin/putrole', validateCreateRoleInput, addRoleHanddler);

// router.delete('/admin/role/delete/:role_id', deleteRoleHandler);

router.use(
  "/roles",
  require("./role.route")
  /*
    #swagger.tags = ['Roles']
    #swagger.security = [{
              "apiKeyAuth": []
      }] 
  */
);
router.use(
  "/admin",
  require("./admin.route")
  // #swagger.tags = ['Admin']
);

module.exports = router;
