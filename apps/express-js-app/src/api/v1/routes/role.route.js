const { Router } = require("express");
const {
  createRoleHandler,
  getRoleByIdHandler,
  getRolesHandler,
} = require("../controllers/admin.controller");
const Auth = require("../middleware/Auth");
const { _requiredRole } = require("../helpers/role");
const { validator, ValidationSource } = require("../helpers/validator");
const {
  createRoleSchema,
  roleIdSchema,
} = require("../validators/roles.schema");

const router = Router();

router.use(
  Auth.authentication,
  _requiredRole("ADMIN", "GUEST"),
  Auth.checkRole
); // xac thuc nguoi dung la ai?

router.post(
  "/create",
  // validateCreatedRole, //old not using
  validator(createRoleSchema, ValidationSource.BODY),
  createRoleHandler
  /*  
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new role.',
            schema: {
                $ref: "#/definitions/CreatedRole"
            }  
        } 
    */
);

router.get(
  "/:id",
  validator(roleIdSchema, ValidationSource.PARAM),
  // _requiredRole("CUSTOMMER_CARE", "ADMIN"), // user phải có quyền 'GUEST' mới được phép truy xuất api này.
  getRoleByIdHandler
);

router.get("/", getRolesHandler);

module.exports = router;
