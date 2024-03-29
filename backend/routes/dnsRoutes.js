const express = require("express");
const router = express.Router();
const dnsController = require("../controller/dnsController");

router.post("/record", dnsController.createRecord);
router.get("/data", dnsController.getRecords);

module.exports= router;