import mongoose, { Schema, Document, Types } from 'mongoose'

export interface Post extends Document {
  title: string
  body: string
  author: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface PostDocument extends Post, Document {}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
)

export const PostModel = mongoose.model<PostDocument>('Post', PostSchema)
