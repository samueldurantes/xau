import mongoose, { Schema, Document, Types } from 'mongoose'

export interface Post {
  title: string
  body: string
  votes: number
  author: Types.ObjectId
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
    votes: {
      type: Number,
      default: 1,
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
    },
  },
)

export const PostModel = mongoose.model<PostDocument>('Post', PostSchema)
