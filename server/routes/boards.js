import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey from GET boards/");
});

export default router;
