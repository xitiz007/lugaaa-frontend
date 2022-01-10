import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: {
        code: {
          type: Number,
          required: true,
        },
        phoneNumber: {
          type: Number,
          required: true,
        },
      },
      required: true
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;
