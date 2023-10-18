const { Router } = require("express");
const {
  createApiKeyHandler,
  getApiKeyHandler,
} = require("../controllers/admin.controller");
const { _requiredRole } = require("../helpers/role");
const { checkApiKey } = require("../middleware/apikey.middleware");
const Auth = require("../middleware/Auth");

const router = Router();

router.post("/user/create", (req, res) => {
  res.send("/user/create");
  // #swagger.tags = ['AD']
});

router.get("/user/list", (req, res) => {
  res.send("/user/list");
  // #swagger.tags = ['ADMIN']
});

module.exports = router;
