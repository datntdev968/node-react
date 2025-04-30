const userRouter = require("./user");
const { errHandler, notFound } = require("../middlewares/errHandler");

const initRoutes = (app) => {
	app.use("/api/users", userRouter); // Gắn prefix /api/users cho tất cả các route trong userRouter

	app.use(notFound);
	app.use(errHandler);
};

module.exports = initRoutes;
