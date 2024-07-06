import shuffle from "shuffle-array";

import PostCollection from "../models/post-model.js";
import VideoCollection from "../models/video-model.js";

export const getAllContentSearchPage = async (req, res, next) => {
  try {
    const { tab, searchItem, category } = req.query;

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

    // Fetch data based on the tab
    let postsList = [];
    let videosList = [];

    if (tab === "all" || tab === "blogs") {
      postsList = await PostCollection.find({
        ...(category && { category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      });
    }

    if (tab === "all" || tab === "practices") {
      videosList = await VideoCollection.find({
        ...(category && { category: category }),
        ...(searchItem && {
          $or: [{ title: regex }, { content: regex }],
        }),
      });
    }

    // Combine and shuffle results if tab is 'all'
    if (tab === "all") {
      const combinedList = [...postsList, ...videosList];
      const shuffleList = shuffle(combinedList, { copy: true });

      return res.status(200).json({
        shuffleList,
        totalItem: combinedList.length,
      });
    }

    // Return results based on the tab
    if (tab === "blogs") {
      return res.status(200).json({
        postsList,
        totalItem: postsList.length,
      });
    }

    if (tab === "practices") {
      return res.status(200).json({
        videosList,
        totalItem: videosList.length,
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
