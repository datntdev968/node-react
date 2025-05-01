const userRouter = require("./auth");
const dashboardRouter = require("./dashboard");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
	app.use("/api/dashboard", dashboardRouter);
	app.use("/api/auth", userRouter);

	app.use(notFound);
	app.use(errHandler);
};

module.exports = initRoutes;
