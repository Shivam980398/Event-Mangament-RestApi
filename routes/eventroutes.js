const express = require("express");
const router = express.Router();
const eventController = require("../controller/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/all-with-registrations",
  eventController.getAllEventsWithRegistrations
);
router.post("/create", eventController.createEvent);
router.get("/:id", eventController.getEventDetails);
router.post(
  "/register",
  authMiddleware.authenticate,
  eventController.registerForEvent
);
router.post(
  "/cancel",
  authMiddleware.authenticate,
  eventController.cancelRegistration
);

router.get("/upcoming/list", eventController.listUpcomingEvents);
router.get("/:id/stats", eventController.getEventStats);

module.exports = router;
