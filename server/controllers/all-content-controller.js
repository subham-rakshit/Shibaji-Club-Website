import shuffle from "shuffle-array";

import PostCollection from "../models/post-model.js";
import VideoCollection from "../models/video-model.js";

//! Get All Contents API with pagination -->

export const getAllContentSearchPage = async (req, res, next) => {
  try {
    const { tab, searchItem, category, page } = req.query;

    //* Validate the page and limit ->
    const parsedPage = parseInt(page);

    if (isNaN(parsedPage) || parsedPage < 1) {
      return res.status(400).json({
        status: 400,
        message: "Invalid page or limit parameters!",
      });
    }

    //? Checking the valid searchItem for handling ["Regular expression is invalid: quantifier does not follow a repeatable item"] this error -->
    //* This error occurs when a quantifier (like *, +, ?, or {n}) is used incorrectly in a regular expression. Quantifiers must follow a repeatable item, such as a character, a group, or a character class. If a quantifier follows an invalid or incomplete item, this error is thrown.
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

    // Storing limit and skip according to tab -->
    let limit;

    if (tab === "all") {
      limit = 6;
    }
    if (tab === "blogs" || tab === "practices") {
      limit = 9;
    }

    const skip = (parsedPage - 1) * limit;

    // Fetch data based on the tab
    let postsList = [];
    let videosList = [];
    let totalPosts = 0;
    let totalVideos = 0;

    if (tab === "all" || tab === "blogs") {
      totalPosts = await PostCollection.countDocuments({
        ...(category && { category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      });
      postsList = await PostCollection.find({
        ...(category && { category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      })
        .skip(skip)
        .limit(limit);
    }

    if (tab === "all" || tab === "practices") {
      totalVideos = await VideoCollection.countDocuments({
        ...(category && { category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      });
      videosList = await VideoCollection.find({
        ...(category && { category: category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      })
        .skip(skip)
        .limit(limit);
    }

    // Combine and shuffle results if tab is 'all' and content per page is 12
    if (tab === "all") {
      const combinedList = [...postsList, ...videosList];
      const shuffleList = shuffle(combinedList, { copy: true });

      return res.status(200).json({
        shuffleList,
        totalItem: totalPosts + totalVideos,
        currentPage: parsedPage,
        totalPages: Math.ceil((totalPosts + totalVideos) / 12),
      });
    }

    // Return results based on the tab and content per page is 9
    if (tab === "blogs") {
      return res.status(200).json({
        postsList,
        totalItem: totalPosts,
        currentPage: parsedPage,
        totalPages: Math.ceil((totalPosts + totalVideos) / limit),
      });
    }

    if (tab === "practices") {
      return res.status(200).json({
        videosList,
        totalItem: totalVideos,
        currentPage: parsedPage,
        totalPages: Math.ceil((totalPosts + totalVideos) / limit),
      });
    }

    // If tab is not recognized, return an error
    return res.status(400).json({
      status: 400,
      message: "Invalid tab value!",
      extraDetails: "Valid tabs are 'all', 'blogs', or 'practices'.",
    });
  } catch (error) {
    next(error);
  }
};
