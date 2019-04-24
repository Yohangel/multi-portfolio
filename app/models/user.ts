const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: false
  },
  projects: [
    {
      name: {
        type: String,
        required: true
      },
      main_image: {
        type: String,
        required: true
      },
      description: String,
      demo: String,
      download: String,
      images: [
        {
          image: String
        }
      ]
    }
  ],
  skills: [
    {
      name: {
        type: String,
        required: true
      },
      percent: {
        type: Number,
        required: true
      },
      color: String
    }
  ],
  profile: [
    {
      avatar: String,
      bio: String,
      linkedin: String,
      facebook: String,
      behance: String,
      twitter: String,
      instagram: String
    }
  ]
});
UserSchema.plugin(uniqueValidator);
const User = mongoose.model("User", UserSchema);
export default User;
