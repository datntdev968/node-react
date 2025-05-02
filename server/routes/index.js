const authRouter = require("./auth");
const userRouter = require("./user");
const baseRouter = require("./base");
const dashboardRouter = require("./dashboard");
const { errHandler, notFound } = require("../middlewares/errHandler");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

const initRoutes = (app) => {
	app.use("/api/auth", authRouter);
	app.use([auth, isAdmin]);
	app.use("/api/dashboard", dashboardRouter);
	app.use("/api/users", userRouter);
	app.use("/api/base", baseRouter);

	app.use(notFound);
	app.use(errHandler);
};

module.exports = initRoutes;
