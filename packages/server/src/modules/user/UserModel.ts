import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User extends Document {
  username: string
  password: string
  posts: Types.ObjectId[]
}

export interface UserDocument extends User, Document {
  hashPassword(password: string): Promise<string>
  authenticate(plainTextPassword: string): Promise<boolean>
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posts: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Post'
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await this.hashPassword(this.password);
    this.password = hashedPassword;
  }

  return next();
});

UserSchema.methods = {
  hashPassword: async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  },

  authenticate: async function (plainTextPassword: string) {
    return await bcrypt.compare(plainTextPassword, this.password);
  }
};

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
