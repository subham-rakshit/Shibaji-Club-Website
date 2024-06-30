import VideoCollection from "../models/video-model.js";

//* Create Post -->
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
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})$/
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
