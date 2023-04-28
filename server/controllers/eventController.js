const { response } = require('express');
const Ngo = require('../models/ngoModel');
const Event = require('../models/eventModel');
const mongoose = require('mongoose');

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


const getEvent = async (req, res) => { 
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such NGO with this id' })
  }
  const event = await Event.findById(id)
  if (!event){
    return res.status(404).json({ err: "Event doesn't exist"})
  }
  res.status(200).json(event)
}


module.exports = { createEvent, getEvent }