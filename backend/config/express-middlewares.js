const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const messageHandler = require("./middlewares/message");

//const pagesRouter = require("../routes/pages");
// const postRoutes

const directoriesApiRouter = require("../routes/api/directories-router");
const extensionAssignerApiRouter = require("../routes/api/extension-assigner-router");
const grouperApiRouter = require("../routes/api/group-router");

function config(app) {
	app.use(express.json());
	app.use(
		session({
			secret: process.env.SESSIONS_SECRET,
			resave: false,
			saveUninitialized: false,
			store: new SQLiteStore({
				db: "extension-setter.sessions.sqlite",
				dir: "./database",
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
			},
		})
	);
	app.use(declareResponseVariables);

	app.locals.APP_NAME = process.env.APP_NAME || "Extension Setter";

	const publicRoutes = express.Router();
	publicRoutes.use(express.static("../frontend/dist"));
	app.use("/public", publicRoutes);
	//app.use(pagesRouter);

	app.use("/api/extension", extensionAssignerApiRouter);
	app.use("/api/grouper", grouperApiRouter);
	app.use("/api/directories", directoriesApiRouter);

	//error handling
	app.use((err, req, res, next) => {
		console.error("[ERROR] Error caught:" + err.stack);

		return res.redirect(
			`/${messageHandler.formatMessage(
				"We encountered a problem and are working on it!",
				messageHandler.MESSAGE_STATUSES.Error
			)}`
		);
	});
}

function declareResponseVariables(req, res, next) {
	res.locals.currentUrl = req.originalUrl;
	next();
}

module.exports = { config };
