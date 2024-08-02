const { User } = require("../models")

module.exports = {
  getAll: async function () {
    try {
      return await User.find({})
    } catch (err) {
      throw new Error(err.message)
    }
  },
  getOne: async function (params) {
    try {
      return await User.findOne(params)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  getById: async function (id) {
    try {
      return await User.findById(id)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  create: async function (data) {
    try {
      return await User.create(data)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  updateById: async function (id, data) {
    try {
      return await User.findByIdAndUpdate(
        id,
        data,
        { new: true }
      )
    } catch (err) {
      throw new Error(err.message)
    }
  },
  deleteById: async function (id) {
    try {
      return await User.findByIdAndDelete(id)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}