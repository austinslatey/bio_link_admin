const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      allowNull: false,
    },
    bio: {
      type: String,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Link',
      },
    ],
  },

  {
    id: false,
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


const User = model('User', userSchema);

module.exports = User;
