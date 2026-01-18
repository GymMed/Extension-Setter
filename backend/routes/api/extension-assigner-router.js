const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const messageHandler = require("../../config/middlewares/message");

const ROOT_DIR = path.resolve(process.env.BROWSE_DIRECTORY);

router.post("/add-missing-extensions", async (req, res) => {
	try {
		console.log("add missing extensions route reached");
		const { directory, extension } = req.body;

		if (!directory || !extension) {
			return res.status(400).json({
				error: "directory and extension are required",
			});
		}

		const relPath = directory === "." ? "" : directory;
		const fullPath = path.resolve(ROOT_DIR, relPath);

		if (!fullPath.startsWith(path.resolve(ROOT_DIR))) {
			return res.status(403).json({ error: "Forbidden path" });
		}

		// Normalize extension → always starts with "."
		const normalizedExt = extension.startsWith(".")
			? extension
			: `.${extension}`;

		fs.readdir(fullPath, { withFileTypes: true }, (err, items) => {
			if (err) {
				console.error("readdir error:", err);
				return res.status(500).json({ error: err.message });
			}

			let renamed = 0;
			let pending = items.length;

			if (!pending) {
				return res.json({
					message: "Missing extensions added",
					renamed,
				});
			}

			items.forEach((item) => {
				if (!item.isFile()) {
					if (!--pending) finish();
					return;
				}

				if (path.extname(item.name)) {
					if (!--pending) finish();
					return;
				}

				const oldPath = path.join(fullPath, item.name);
				const newPath = `${oldPath}${normalizedExt}`;

				fs.rename(oldPath, newPath, (renameErr) => {
					if (renameErr) {
						console.error("rename error:", renameErr);
					} else {
						renamed++;
					}

					if (!--pending) finish();
				});
			});

			function finish() {
				res.json({
					message: "Missing extensions added",
					renamed,
				});
			}
		});
	} catch (error) {
		console.error("Extension assigner error:", error);
		return res.status(500).json({
			error: "Error processing files with new extensions",
		});
	}
});

module.exports = router;
