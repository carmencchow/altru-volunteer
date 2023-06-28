import Ngo from "../models/ngoModel.js";

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
    console.log(category, frequency);
    if (frequency === "all" && category === "all") {
      let ngos = await Ngo.find({});
      return res.status(200).json(ngos);
    }
    if (frequency === "all") {
      let ngos = await Ngo.find({ category: category });
      return res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ frequency: frequency });
      return res.status(200).json(ngos);
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
  const ngo = await Ngo.findById(id);
  if (!ngo) {
    console.log("NGO not exist");
    return res.status(404).json({ err: "NGO doesn't exist" });
  }
  return res.status(200).json(ngo);
};

// Create NGO
const createNgo = async (req, res) => {
  try {
    const { name, phone, category, commitment, frequency } = req.body;
    const newNgo = await Ngo.create({
      name,
      phone,
      category,
      commitment,
      frequency,
    });
    await newNgo.save();
    return res.status(200).send({ ngo: newNgo });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

// Edit NGO
const editNgo = async (req, res) => {
  try {
    const {
      event,
      help,
      eventDate,
      eventTime,
      eventDescription,
      numVolunteers,
    } = req.body;
    const ngo = await Ngo.find(req.params.id);
    await ngo.save();
    res.status(200).send({ ngo: ngo });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while updating");
  }
};

const updateVolunteerCount = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await Ngo.findByIdAndUpdate(
      id,
      { $inc: { num_volunteers: -1 } },
      { new: true }
    );
    console.log("numVol:", ngo.num_volunteers);
    return res.status(200).json(ngo.num_volunteers);
  } catch (err) {
    return res.status(400).json({ err: err.message, ngo: ngo });
  }
};

export {
  getNgos,
  getNgo,
  createNgo,
  editNgo,
  getFiltered,
  updateVolunteerCount,
};
