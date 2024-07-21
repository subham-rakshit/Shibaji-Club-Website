import UserCollection from "../models/user-model.js";
import VideoCollection from "../models/video-model.js";

//* Create Video -->
export const createVideo = async (req, res, next) => {
  //? Check if user isAdmin or not -->
  if (!req.user.isAdmin) {
    const adminAuthError = {
      status: 403,
      message: "Not a admin",
      extraDetails: "You are not allowed to create videos!",
    };
    return next(adminAuthError);
  }

  //? Check if user provide title and content or not -->
  if (!req.body.title || !req.body.content || !req.body.videoDuration) {
    const adminAuthError = {
      status: 403,
      message: "Data empty",
      extraDetails: "Please provide all required fields!",
    };
    return next(adminAuthError);
  }

  //? Check if User's provide title have any special characters after and before or not -->
  if (!req.body.title.match(/^[a-zA-Z0-9].*[a-zA-Z0-9]$/)) {
    const titleError = {
      status: 401,
      message: "Special characters detect!",
      extraDetails:
        "The title can't start or end with a special character. Please revise the title!",
    };
    return next(titleError);
  }

  //? Check if User's provide valid youtbe video link or not -->
  if (
    !req.body.videoURL.match(
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|shorts\/|live\/)?([a-zA-Z0-9_-]{11})(\S*)?$/
    )
  ) {
    const titleError = {
      status: 401,
      message: "Not a valid URL!",
      extraDetails: "Please enter a valid YouTube video link.!",
    };
    return next(titleError);
  }

  //? Check if same title is already exist or not -->
  if (req.body.title) {
    const title = req.body.title;
    const titleExists = await VideoCollection.findOne({ title });

    if (titleExists) {
      const titleExistsError = {
        status: 400,
        message: "Title present in DB",
        extraDetails: "Someone already use this title. Please revise this!",
      };
      return next(titleExistsError);
    }
  }

  //? We are creating slug for posts. Because of SEO purposes, it's better to have slug of post istead of just post id for the URL.
  const slug = req.body.title
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();

  //? Create New Post -->
  const newVideo = new VideoCollection({
    ...req.body,
    title: req.body.title.trim(),
    content: req.body.content.trim(),
    videoURL: req.body.videoURL.trim(),
    slug,
    userId: req.user.userId,
  });

  try {
    const saveVideo = await newVideo.save();
    res.status(201).json({
      message: "You have successfully created a new video",
      videoDetails: saveVideo,
    });
  } catch (error) {
    next(error);
  }
};

//* Get all Videos -->
export const getVideos = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const searchItem = req.query.searchItem;

    let regex;
    try {
      regex = new RegExp(searchItem, "i");
    } catch (error) {
      const regexError = {
        status: 400,
        message: "Invalid regular expression!",
        extraDetails: "Invalid search query. Please correct and try again.",
      };
      return next(regexError);
    }

    const videos = await VideoCollection.find({
      //? Posts for specific person
      ...(req.query.userId && { userId: req.query.userId }),
      //? Posts for specific category
      ...(req.query.category && { category: req.query.category }),
      //? Posts for specific slug to use this API where ever u want
      ...(req.query.slug && { slug: req.query.slug }),
      //? Posts for specific postId (_id)
      ...(req.query.videoId && { _id: req.query.videoId }),
      //? We extract posts based on seach words if those words present in title or content in a post
      ...(req.query.searchItem && {
        // $or allow use search b/w two places, $regex allows us to search a perticular word by it's letters, $options allows case-insensitive
        $or: [{ title: regex }, { content: regex }],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //* Total number of videos
    const totalVideos = await VideoCollection.countDocuments();

    //* Total number of videos in Last Month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthVideos = await VideoCollection.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    //* Send the response
    res.status(200).json({
      videos,
      totalVideos,
      lastMonthVideos,
    });
  } catch (error) {
    next(error);
  }
};

//* Update a specific video -->
export const updateVideo = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to update this video!",
    };
    return next(authError);
  }
  try {
    const updatedVideoDetails = await VideoCollection.findByIdAndUpdate(
      req.params.videoId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          thumbnailURL: req.body.thumbnailURL,
          category: req.body.category,
          slug: req.body.title
            .trim()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .join("-")
            .toLowerCase(),
          ageRange: req.body.ageRange,
          requiredEquipments: req.body.requiredEquipments,
          requiredPlayers: req.body.requiredPlayers,
          videoDuration: req.body.videoDuration,
          videoURL: req.body.videoURL,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "You have successfully updated this video.",
      videoDetails: updatedVideoDetails,
    });
  } catch (error) {
    next(error);
  }
};

//* Delete a specific video -->
export const deleteVideo = async (req, res, next) => {
  //? Check user is an admin or not
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to delete this video!",
    };
    return next(authError);
  }
  try {
    await VideoCollection.findByIdAndDelete(req.params.videoId);
    res.status(200).json({
      message: "The video has been deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//* Get Recent 3 videos -->
export const getRecentVideos = async (req, res, next) => {
  try {
    const totalVideosCount = await VideoCollection.countDocuments();
    const startIndex = Math.floor(Math.random() * totalVideosCount);

    const videos = await VideoCollection.find().skip(startIndex).limit(3);

    //* Send the response
    res.status(200).json({
      videos,
    });
  } catch (error) {
    next(error);
  }
};

//* Save perticular video -->
export const saveVideo = async (req, res, next) => {
  try {
    if (req.user.userId !== req.params.userId) {
      const authError = {
        status: 403,
        message: "Not Authenticated",
        extraDetails: "Please register to save this video.",
      };
      return next(authError);
    }

    // Get the user info
    const user = await UserCollection.findById(req.user.userId);
    if (!user) {
      const userError = {
        status: 404,
        message: "User not registered",
        extraDetails: "Please register to save this video.",
      };
      return next(userError);
    }

    // Check if videoId already present in saveVideos Array
    const videoIndex = user.savedVideos.indexOf(req.params.videoId);
    if (videoIndex > -1) {
      // We have to remove that videoId from there
      user.savedVideos.splice(videoIndex, 1);
      await user.save();

      const { password, ...rest } = user._doc;
      return res.status(200).json({
        message: "Video removed from Saved Videos tab successfully",
        userDetails: rest,
      });
    } else {
      // Add the videoId in savedVideos array
      user.savedVideos.push(req.params.videoId);
      await user.save();
      const { password, ...rest } = user._doc;
      return res.status(200).json({
        message:
          "Video saved successfully! You can watch it later in the Saved Videos tab.",
        userDetails: rest,
      });
    }
  } catch (error) {
    return next(error);
  }
};
