const { Link, User } = require("../models");

module.exports = {
  getAll: async function () {
    try {
      return await Link.find({})
        .populate('user_id', 'username avatar bio');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getOne: async function (criteriaObj) {
    try {
      return await Link.findOne(criteriaObj)
        .populate('user_id', 'username avatar bio');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getById: async function (id) {
    try {
      return await Link.findById(id)
        .populate('user_id', 'username avatar bio');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getByUsername: async function (username) {
    try {
      console.log(`Fetching links for username: ${username}`);
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const links = await Link.find({ user_id: user._id })
        .populate('user_id', 'username avatar bio');
      console.log(`Fetched ${links.length} links for username: ${username}`);
      return links;
    } catch (err) {
      throw new Error(`Error fetching links by username: ${err.message}`);
    }
  },

  create: async function (data) {
    try {
      const user = await User.findOne({ username: data.username });
      if (!user) {
        throw new Error('User not found');
      }
      const newLink = new Link({
        linkTitle: data.linkTitle,
        url: data.url,
        icon: data.icon || '',
        order: data.order || 0,
        user_id: user._id,
      });
      const savedLink = await newLink.save();
      user.links.push(savedLink._id);
      await user.save();
      return savedLink;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updateById: async function (id, data, currentUserUsername) {
    try {
      const link = await Link.findById(id).populate('user_id');
      if (!link) {
        throw new Error('Link not found');
      }
      const user = await User.findById(link.user_id);
      if (user.username !== currentUserUsername) {
        throw new Error('You can only update your own links.');
      }
      link.linkTitle = data.linkTitle;
      link.url = data.url;
      link.icon = data.icon || '';
      link.order = data.order || 0;
      link.active = data.active !== undefined ? data.active : link.active;
      const updatedLink = await link.save();
      return updatedLink;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deleteById: async function (id, currentUserUsername) {
    try {
      const link = await Link.findById(id).populate('user_id');
      if (!link) {
        throw new Error('Link not found');
      }
      const user = await User.findById(link.user_id);
      if (user.username !== currentUserUsername) {
        throw new Error('You can only delete your own links.');
      }
      return await Link.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
