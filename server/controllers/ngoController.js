const { response } = require("express");
const Ngo = require("../models/ngoModel");
const mongoose = require("mongoose");

// Get all NGOs
const getNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find({}).sort({ name: 1 });
    res.status(200).json(ngos);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

// Get filtered NGOs
const getFiltered = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const frequency = req.params.frequency.toLowerCase();

    if (frequency === "all" && category === "all") {
      let ngos = await Ngo.find({});
      res.status(200).json(ngos);
    }
    if (frequency === "all") {
      let ngos = await Ngo.find({ category: category });
      res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ frequency: frequency });
      res.status(200).json(ngos);
    } else {
      let ngos = await Ngo.find({ category: category, frequency: frequency });
      return res.status(200).json(ngos);
    }
  } catch (err) {
    console.log(err);
  }
};

const getNgo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such NGO with this id" });
  }
  const ngo = await Ngo.findById(id);
  if (!ngo) {
    return res.status(404).json({ err: "NGO doesn't exist" });
  }
  res.status(200).json(ngo);
};

const createNgo = async (req, res) => {
  const { name, category, commitment, frequency, event } = req.body;
  try {
    const ngo = await Ngo.create({
      name,
      category,
      commitment,
      frequency,
      event,
    });
    res.status(200).json(ngo);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
};
