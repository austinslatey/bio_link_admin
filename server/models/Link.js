const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const linkSchema = new Schema(
  {
    linkTitle: {
      type: String,
      required: 'You need to leave a link title!',
      minlength: 1,
      maxlength: 100
    },
    url: {
      type: String,
      required: 'You need to provide a URL!',
      minlength: 1,
      maxlength: 500
    },
    icon: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Link = model('Link', linkSchema);

module.exports = Link;
