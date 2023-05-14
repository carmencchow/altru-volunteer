const express = require("express");
const auth = require("../middleware/auth");
const {
  getUser,
  getUsers,
  deleteProfile,
  addEvent,
  follow,
  unfollow,
  editProfile,
  addDonation,
  editGoal,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteProfile);
router.put("/:id", editProfile);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);
router.post("/:id/add-event", addEvent);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);

module.exports = router;
