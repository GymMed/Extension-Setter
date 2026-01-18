const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router();

const messageHandler = require("../../config/middlewares/message");

const ROOT_DIR = path.resolve(process.env.BROWSE_DIRECTORY);

router.post("/path", async (req, res) => {
	try {
		const { directory = "." } = req.body;

		const fullPath = path.resolve(ROOT_DIR, directory);

		// Prevent path traversal
		if (!fullPath.startsWith(ROOT_DIR)) {
			return res.status(403).json({ error: "Forbidden" });
		}

		fs.readdir(fullPath, { withFileTypes: true }, (err, items) => {
			if (err) return res.status(500).json({ error: err.message });

			const dirs = items
				.filter((i) => i.isDirectory())
				.map((d) => ({
					name: d.name,
				}));

			res.json({
				message: "Retrieved directories",
				path: directory,
				directories: dirs,
			});
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to group files" });
	}
});

module.exports = router;
