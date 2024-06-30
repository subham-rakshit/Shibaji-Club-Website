import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
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
    thumbnailURL: {
      type: String,
      default:
        "https://scontent-ccu1-2.xx.fbcdn.net/v/t31.18172-8/10504977_1504154999815473_8283182664133810327_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=Uwk6hQl-SCoQ7kNvgGjd3_t&_nc_ht=scontent-ccu1-2.xx&oh=00_AYDa72lUKRv1kn26ZANweaOHWBlzChkQYMd-C6-FgqlCvw&oe=66A8C633",
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
    ageRange: {
      type: Array,
      required: true,
    },
    requiredEquipments: {
      type: Array,
      required: true,
    },
    requiredPlayers: {
      type: Array,
      required: true,
    },
    videoDuration: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VideoCollection = new mongoose.model("Video", videoSchema);

export default VideoCollection;
