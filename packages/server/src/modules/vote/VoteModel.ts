import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface Vote extends Document {
  user: Types.ObjectId
  post: Types.ObjectId
}

const VoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
    index: true,
  },
})

// TODO: investigate this problem
// @ts-ignore
export const VoteModel: Model<Vote> = mongoose.model('Vote', VoteSchema)
