import mongoose, { Schema, Document} from "mongoose";

interface IUser extends Document {
  username: string,
  email: string,
  password: string,
  sixStarRatingsLeft: number,
}

const userSchema = new Schema <IUser>({
  username: { type: String, unique: true, required: true},
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true},
  sixStarRatingsLeft: { type: Number, default: 5},
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;