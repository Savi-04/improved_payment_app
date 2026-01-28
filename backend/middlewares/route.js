const express = require("express");
const router = express.Router();
const { signInValidator, signUpValidator } = require("../driver_functions/validator");
const { jwtValidator } = require("./jwtValidator");
const { listAllUsers, searchUsers } = require("../driver_functions/listUsers");
const { updateUserInfo } = require("../driver_functions/updateInfo");
const { getBalanceInfo } = require("../driver_functions/accountBalance");
const { transfer } = require("../driver_functions/transfer");
const { userInfo } = require("../driver_functions/user-info");


router.post("/signin", jwtValidator, signInValidator);
router.post("/signup", signUpValidator);
router.get("/listUsers", jwtValidator, listAllUsers);
router.get("/user-info", jwtValidator, userInfo)
router.put("/user", jwtValidator, updateUserInfo);
router.get("/bulk",jwtValidator, searchUsers);
router.get("/user/balance", jwtValidator, getBalanceInfo)
router.post("/transfer", jwtValidator, transfer );
// router.post("/transfer", transfer ); // enabled for testing without jwt



module.exports = router;