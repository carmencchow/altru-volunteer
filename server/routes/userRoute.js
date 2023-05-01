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
router.get("/:id", auth, getUser);
router.delete("/:id", auth, deleteProfile);
router.put("/:id", auth, editProfile);
router.put("/:id/amount", auth, editGoal);
router.post("/:id/donation", auth, addDonation);
router.post("/:id/add-event", auth, addEvent);
router.post("/:id/follow/ngo", auth, follow);
router.post("/:id/unfollow/ngo", auth, unfollow);

module.exports = router;
