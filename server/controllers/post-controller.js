import PostCollection from "../models/post-model.js";

export const createPost = async (req, res, next) => {
  //? Check if user isAdmin or not -->
  if (!req.user.isAdmin) {
    const adminAuthError = {
      status: 403,
      message: "Not a admin",
      extraDetails: "You are not allowed to create a post!",
    };
    return next(adminAuthError);
  }
  //? Check if user provide title and content or not -->
  if (!req.body.title || !req.body.content) {
    const adminAuthError = {
      status: 403,
      message: "Data empty",
      extraDetails: "Please provide all required fields!",
    };
    return next(adminAuthError);
  }
  //? Check if User's provide title have any special characters or not -->
  if (!req.body.title.match(/^[a-zA-Z0-9 ]+$/)) {
    const titleError = {
      status: 401,
      message: "Special characters exist",
      extraDetails: "Please don't use special characters!",
    };
    return next(titleError);
  }
  //? Check if same title is already exist or not -->
  if (req.body.title) {
    const title = req.body.title;
    const titleExists = await PostCollection.findOne({ title });
    console.log(titleExists);

    if (titleExists) {
      const titleExistsError = {
        status: 400,
        message: "Title present in DB",
        extraDetails: "Title already exists!",
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
  const newPost = new PostCollection({
    ...req.body,
    title: req.body.title.trim(),
    content: req.body.content.trim(),
    slug,
    userId: req.user.userId,
  });

  try {
    const savePost = await newPost.save();
    res.status(201).json({
      message: "You have successfully created a new post",
      postDetails: savePost,
    });
  } catch (error) {
    next(error);
  }
};
