import express from "express";
import {
  getUser,
  addEvent,
  follow,
  unfollow,
  editProfile,
  addDonation,
  editGoal,
} from "../controllers/userController.js";
// const express = require("express");
// const {
//   getUser,
//   addEvent,
//   follow,
//   unfollow,
//   editProfile,
//   addDonation,
//   editGoal,
// } = require("../controllers/userController.js");

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", editProfile);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);
router.post("/:id/add-event", addEvent);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);

export default router;

// module.exports = router;
// // module.exports = {
// //   getUser,
// //   addEvent,
// //   follow,
// //   unfollow,
// //   editProfile,
// //   addDonation,
// //   editGoal,
// // };
