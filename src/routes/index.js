const router = require("express").Router();
const infRouter = require("./inf.route");
const jnfRouter = require("./jnf.route");
const oauthRouter = require("./oauth.route");
const mailRouter = require("./mail.route");
const hrRouter = require("./hr.route");
const invitationRouter = require("./invitation.route");
const companyRouter = require("./company.route");
router.use("/inf", infRouter);
router.use("/jnf", jnfRouter);
router.use("/oauth", oauthRouter);
router.use("/mail", mailRouter);
router.use("/hr", hrRouter);
router.use("/invitation", invitationRouter);
router.use("/company", companyRouter);

module.exports = router;
