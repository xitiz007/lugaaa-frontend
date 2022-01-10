import mongoose from 'mongoose';
const {Schema} = mongoose;

const VerifyOrderSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'order'
    },
    method: {
        type: String,
        required: true,
        enum: ['esewa', 'khalti', 'nabil']
    }
}, {
    timestamps: true
});

const VerifyOrder =
  mongoose.models.verifyOrder ||
  mongoose.model("verifyOrder", VerifyOrderSchema);
export default VerifyOrder;