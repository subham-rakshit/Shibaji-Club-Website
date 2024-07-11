import PostCollection from "../models/post-model.js";

//* Create Post -->
export const createPost = async (req, res, next) => {
  //? Check if user isAdmin or not -->
  if (!req.user.isAdmin) {
    const adminAuthError = {
      status: 403,
      message: "Not a admin",
      extraDetails: "You are not allowed to create posts!",
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
  if (!req.body.title.match(/^[a-zA-Z0-9].*[a-zA-Z0-9]$/)) {
    const titleError = {
      status: 401,
      message: "Special characters detect!",
      extraDetails:
        "The title cannot start or end with a special character. Please revise the sentence!",
    };
    return next(titleError);
  }
  //? Check if same title is already exist or not -->
  if (req.body.title) {
    const title = req.body.title;
    const titleExists = await PostCollection.findOne({ title });

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

//* Get all Posts -->
export const getPosts = async (req, res, next) => {
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

    const posts = await PostCollection.find({
      //? Posts for specific person
      ...(req.query.userId && { userId: req.query.userId }),
      //? Posts for specific category
      ...(req.query.category && { category: req.query.category }),
      //? Posts for specific slug to use this API where ever u want
      ...(req.query.slug && { slug: req.query.slug }),
      //? Posts for specific postId (_id)
      ...(req.query.postId && { _id: req.query.postId }),
      //? We extract posts based on seach words if those words present in title or content in a post
      ...(req.query.searchItem && {
        // $or allow use search b/w two places, $regex allows us to search a perticular word by it's letters, $options allows case-insensitive
        $or: [{ title: regex }, { content: regex }],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //* Total number of posts for Dashboard
    const totalPosts = await PostCollection.countDocuments();

    //* Total number of posts in Last Month for Dashboard
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await PostCollection.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    //* Send the response
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

//* Get Recent 3 posts -->
export const getRecentPosts = async (req, res, next) => {
  try {
    const totalPostsCount = await PostCollection.countDocuments();
    const startIndex = Math.floor(Math.random() * totalPostsCount);

    const posts = await PostCollection.find().skip(startIndex).limit(3);

    //* Send the response
    res.status(200).json({
      posts,
    });
  } catch (error) {
    next(error);
  }
};

//* Delete a specific post -->
export const deletePost = async (req, res, next) => {
  //? Check user is an admin or not
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to delete this post!",
    };
    return next(authError);
  }
  try {
    await PostCollection.findByIdAndDelete(req.params.postId);
    res.status(200).json({
      message: "The post has been deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//* Update a specific post -->
export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    const authError = {
      status: 403,
      message: "Not Authenticated",
      extraDetails: "You are not allowed to update this post!",
    };
    return next(authError);
  }
  try {
    const updatedPostDetails = await PostCollection.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          blogImage: req.body.blogImage,
          category: req.body.category,
          slug: req.body.title
            .trim()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .join("-")
            .toLowerCase(),
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "You have successfully updated this post.",
      postDetails: updatedPostDetails,
    });
  } catch (error) {
    next(error);
  }
};
