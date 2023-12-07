const router = require("express").Router();
const authRouter = require('../controllers/auth.controller')

router.get("/register", authRouter.register);
router.post('/register', authRouter.doRegister)

router.get("/login", authRouter.login);
router.post("/login", authRouter.doLogin);

router.get("/profile", authRouter.profile);

module.exports = router;