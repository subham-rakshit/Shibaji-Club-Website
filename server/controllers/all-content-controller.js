import shuffle from "shuffle-array";

import PostCollection from "../models/post-model.js";
import VideoCollection from "../models/video-model.js";

export const getAllContentSearchPage = async (req, res, next) => {
  try {
    const tab = req.query.tab;
    const searchItem = req.query.searchItem;

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

    const postsList = await PostCollection.find({
      ...(req.query.searchItem && {
        // $or allow use search b/w two places, $regex allows us to search a perticular word by it's letters, $options allows case-insensitive
        $or: [{ title: regex }, { content: regex }],
      }),
    });

    const videosList = await VideoCollection.find({
      ...(req.query.searchItem && {
        // $or allow use search b/w two places, $regex allows us to search a perticular word by it's letters, $options allows case-insensitive
        $or: [{ title: regex }, { content: regex }],
      }),
    });

    //? Combine all list's items and shuffle it for all content tab in search page -->
    const combinedList = [...postsList, ...videosList];

    //* Method - 1 (Manually)
    //   for (let i = combinedList.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [combinedList[i], combinedList[j]] = [combinedList[j], combinedList[i]];
    //   }

    //* Method -2 (shuffle-array npm)
    const shuffleList = shuffle(combinedList, {
      copy: true,
    });

    tab === "all" &&
      res.status(200).json({
        shuffleList,
        postsList,
        videosList,
        totalItem: combinedList.length,
      });

    tab === "blogs" &&
      res.status(200).json({ postsList, totalItem: postsList.length });
    tab === "practices" &&
      res.status(200).json({ videosList, totalItem: videosList.length });
  } catch (error) {
    next(error);
  }
};
