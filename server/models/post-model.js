import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    blogImage: {
      type: String,
      default:
        "https://www.shutterstock.com/shutterstock/photos/2172254787/display_1500/stock-vector-football-cup-soccer-banner-template-sport-poster-infinity-concept-background-2172254787.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PostCollection = new mongoose.model("Post", postSchema);

export default PostCollection;
