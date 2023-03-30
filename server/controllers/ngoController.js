const Ngo = require('../models/ngoModel');
const mongoose = require('mongoose');

// 1. GET and sort all NGOS alphabetically
// Return first 5 results on page 1: 
// http://localhost:5000/api/ngos?page=1
const getNgos = async (req, res) => {
  // const { page = 1, limit = 5} = req.query;
  // const startIndex = (page - 1 ) * limit // 
  // const endIndex = page * limit
  // const resNGOs = ngos.slice(startIndex, endIndex)
  // res.json(resNGOs)

  // All query params in here
  const query = {}

  try {
    const ngos = await Ngo.find({}).sort({name: 1})
  // .limit(limit * 1).skip((page - 1) * limit).exec(); 
  // const count = await Ngo.countDocuments(query);
    res.status(200).json(ngos)
  // const pageCount = count / limit;
    } catch (err){
    console.log(err.message);
    res.sendStatus(500);
    }
  }

const getFilteredNgos = async (req, res) => { 
  const cause = req.params.cause.toLowerCase();
  const region = req.params.region.toLowerCase();

  let ngos; 
  
  // if user doesn't select both
  if (cause === 'all' && region === 'all') {
    ngos = await Ngo.find({})
  }

  // if user doesn't select cause/category
  else if (cause === 'all') {
    ngos = await Ngo.find({ location: region })
  }

  // if user doesn't select location
  else if (region === 'all') {
    ngos = await Ngo.find({ category: cause })
  }

  else {
    ngos = await Ngo.find({ location: region, category: cause})
  }   
  res.send(ngos);
}

// 2. GET a single NGO by grabbing id from the route parameter in main.js and checking use mongoose to check if its id is valid
const getNgo = async (req, res) => { 
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  const ngo = await Ngo.findById(id)
  if (!ngo){
    return res.status(404).json({ err: "NGO doesn't exist"})
  }
  res.status(200).json(ngo)
}

// 3. CREATE new NGO by grabbing props from the req.body 
const createNgo = async (req, res) => {
  const { id, name, founded, category, website, region, tag, campaign } = req.body 
  try { 
    const ngo = await Ngo.create({ id, name, founded, category, website, region, tag, campaign })
    res.status(200).json(ngo) 
  } catch (err) {
    res.status(400).json({ err: err.message })
  }}


// DELETE an NGO
const deleteNgo = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  // Find MongoDB document _id that's equal to the id of the ngo we want to delete
  const ngo = await Ngo.findOneAndDelete({_id: id}) 
  if (!ngo){
    return res.status(404).json({ err: "NGO doesn't exist"})
  }
  res.status(200).json(ngo)
}

// UPDATE an NGO
const updateNgo = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  // update with whatever is in the req object's body
  const ngo = await Ngo.findOneAndUpdate({_id: id}, { ...req.body }) 
  if (!ngo){
    return res.status(404).json({ err: "NGO doesn't exist"})
  }
  res.status(200).json(ngo);
}

module.exports = { createNgo, getNgos, getNgo, getFilteredNgos, deleteNgo, updateNgo }