const fs = require("fs-extra");
const path = require("path");

const express = require("express");
const router = express.Router();

const messageHandler = require("../../config/middlewares/message");

const ROOT_DIR = path.resolve(process.env.BROWSE_DIRECTORY);

router.post("/extension", async (req, res) => {
	try {
		const { directory } = req.body;

		if (!directory) {
			return res.status(400).json({ error: "directory is required" });
		}

		const relPath = directory === "." ? "" : directory;
		const fullPath = path.resolve(ROOT_DIR, relPath);

		if (!fullPath.startsWith(path.resolve(ROOT_DIR))) {
			return res.status(403).json({ error: "Forbidden path" });
		}

		const files = await fs.readdir(fullPath);

		let moved = 0;

		for (const file of files) {
			const filePath = path.join(fullPath, file);
			const stat = await fs.stat(filePath);

			if (!stat.isFile()) continue;

			const ext = path.extname(file).slice(1) || "no-extension";
			const targetDir = path.join(fullPath, ext);

			await fs.ensureDir(targetDir);
			await fs.move(filePath, path.join(targetDir, file), {
				overwrite: false,
			});

			moved++;
		}

		res.json({
			message: "Files grouped by extension",
			moved,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to group files" });
	}
});

module.exports = router;
