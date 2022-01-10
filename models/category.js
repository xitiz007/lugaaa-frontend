import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
      name: {
          type: String,
          required: true,
          trim: true
      }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.category || mongoose.model("category", categorySchema);
export default Category;
