import mongoose from "mongoose";

const passRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Foreign key to user
    name: { type: String, required: true },
    enrollmentNumber: { type: String, required: true },
    proceedingTo: { type: String, required: true },
    currentSemester: { type: String, required: true },
    transport: { type: String },
    purpose: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    atOwnResponsibility: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    RejectedReason:{type:String},
    createdAt: { type: Date, default: Date.now },
});

// Create a model
const Passmodel = mongoose.models.passRequest || mongoose.model("passRequest", passRequestSchema);

export default Passmodel;
