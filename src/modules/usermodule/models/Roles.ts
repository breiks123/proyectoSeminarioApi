import mongoose, { Document, Schema } from "mongoose";
export interface IRoles extends Document {
    name: string
}
const RolesSchema = new Schema({
    name: { type: String, required: true, unique: true },
});
export default mongoose.model<IRoles>("Roles", RolesSchema);