const { response } = require('express');
const Ngo = require('../models/ngoModel');
const Event = require('../models/eventModel');
const mongoose = require('mongoose');

const getNgos = async (req, res) => {
  const query = {}
  try {
    const ngos = await Ngo.find({})
    // const ngos = await Ngo.find({}).sort({name: 1})
    res.status(200).json(ngos)
    } catch (err){
    console.log(err.message);
    res.sendStatus(500);
    }
  }

const getFiltered = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const frequency = req.params.frequency.toLowerCase();
    let ngos = await Ngo.find({ category: category, frequency: frequency})
    res.status(200).json(ngos);
  } catch (err) {
    console.log(err);
  }
}

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

const createNgo = async (req, res) => {
  const { id, name, category } = req.body 
  try { 
    const ngo = await Ngo.create({ id, name, category, isFavorite: false })
    res.status(200).json(ngo) 
  } catch (err) {
    res.status(400).json({ err: err.message })
  }}


const createEvent = async (req, res) => {
  const { name, date, time, description, ngoId } = req.body
  try { 
    const event = await Event.create({ name, date, time, description, parentNgo: ngoId })
    const parent = await Ngo.findById(ngoId)
    parent.event.push(event._id)
    await parent.save(); 
    res.status(200).json(event) 
  } catch (err) {
    res.status(400).json({ err: err.message })
  }}


const deleteNgo = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  const ngo = await Ngo.findOneAndDelete({_id: id}) 
  if (!ngo){
    return res.status(404).json({ err: "NGO doesn't exist"})
  }
  res.status(200).json(ngo)
}

const updateNgo = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  const ngo = await Ngo.findOneAndUpdate({_id: id}, { ...req.body }) 
  if (!ngo){
    return res.status(404).json({ err: "NGO doesn't exist"})
  }
  res.status(200).json(ngo);
}

module.exports = { createNgo, createEvent, getNgos, getNgo, getFiltered, deleteNgo, updateNgo }