const {Router} = require ("express");
const userRouter = Router();
const {hashPassword, comparePassword} = require("../middleware/index.js")
const {register, login, listAllUsers} = require("../controllers/usercontrollers.js")

userRouter.post("/registerUser", hashPassword, register);
userRouter.post("/loginUser",comparePassword, login);

userRouter.get("/listAllUsers", listAllUsers);

module.exports = userRouter;