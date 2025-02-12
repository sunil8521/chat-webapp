import userModel from "../schema/User.js";
import requestModel from "../schema/Request.js";
import { CustomError, errorHandler } from "../error/error.js";
import { tokenProvider, cookieOption } from "../helpers/TokenProvider.js";
import chatModel from "../schema/Chat.js";
import messageModel from "../schema/Message.js";

export const signUp = errorHandler(async (req, res, next) => {
  const newUser = await userModel.create(req.body);
  tokenProvider(201, res, newUser);
});

export const signIn = errorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please provide email and password!", 400));
  }
  const existUser = await userModel.findOne({ email }).select("+password");
  if (
    !existUser ||
    !(await existUser.Checkpassword(password, existUser.password))
  ) {
    return next(new CustomError("Incorrect email or password!", 401));
  }
  tokenProvider(200, res, existUser);
});

export const getMe = (req, res, next) => {
  res.json(req.user);
};

export const logout = (req, res, next) => {
  res
    .cookie("token", "", { ...cookieOption, maAgee: 0 })
    .json({ success: true, message: "Logout successfully" });
};

export const sendRequest = errorHandler(async (req, res, next) => {
  const { touserid } = req.body;
  const sender = req.user._id;
  const request = await requestModel.findOne({
    $or: [
      { touserid, fromuserid: req.user._id },
      {
        touserid: req.user._id,
        fromuserid: touserid,
      },
    ],
  });
  if (request) {
    return next(new CustomError("Request already sent", 400));
  }
  const createRequest = await requestModel.create({
    fromuserid: sender,
    touserid,
  });

  res.status(201).json({ success: true, message: "Friend request sent" });
});

export const handleRequest = errorHandler(async (req, res, next) => {
  const { status, requestid } = req.body;
  const request = await requestModel.findById(requestid);
  if (!request) {
    return next(new CustomError("Request not found.", 404));
  }
  if (status === "accept") {
    await chatModel.create({
      participants: [request.fromuserid, request.touserid],
    });
    await requestModel.findByIdAndDelete(requestid);
    return res.status(200).json({
      success: true,
      message: "Friend request accepted. Chat created.",
    });
  }

  if (status === "reject") {
    await requestModel.findByIdAndDelete(requestid);

    return res.status(200).json({
      success: true,
      message: "Friend request rejected.",
    });
  }
});
export const myfrinendRequest = errorHandler(async (req, res, next) => {
  const requests=await requestModel.find({
    touserid:req.user._id
  }).populate({
    path:"fromuserid",
    model: userModel,
    select: "fullname avtar username",
  })
  res.status(200).json({ success: true,requests });
});
export const findFriends = errorHandler(async (req, res, next) => {
  const yourUserId = req.user._id;

  let matchedChats = await chatModel
    .find({ participants: yourUserId })
    .populate({
      path: "participants",
      model: userModel,
      select: "fullname avtar username",
    })
    .populate({
      path: "lastmessage",
      model: messageModel,
      select: "content updatedAt",
    });

  matchedChats = matchedChats.map(({ _id, participants, lastmessage }) => {
    // Find the participant whose ID is not equal to your user ID

    participants = participants.find(
      ({ _id }) => _id.toString() !== yourUserId.toString()
    );
    return {
      _id,
      participants,
      lastmessage,
    };
  });

  res.status(200).json({ success: true, matchedChats });
});

export const findMyMessages = errorHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let allMessages = await messageModel
    .find({ chatid: chatId })
    .populate({
      path: "senderid",
      model: userModel,
      // select: "content updatedAt",
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();

  allMessages = allMessages.reverse();

  const totalMessages = await messageModel.countDocuments({ chatid: chatId });
  const totalPages = Math.ceil(totalMessages / limit);
  res.status(200).json({
    success: true,
    allMessages,
    pagination: {
      currentPage: page,
      totalPages,
      totalMessages,
      limit,
    },
  });
});

export const getMembers = errorHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const myId = req.user._id;
  const members = await chatModel.findById(chatId).populate({
    path: "participants",
    model: userModel,
    select: "fullname avtar username",
  });

  res.status(200).json({ success: true, members });
});

export const searchUser = errorHandler(async (req, res, next) => {
  const { search } = req.query;

  const yourUserId = req.user._id;

  let allReadyFriends = await chatModel.find({ participants: yourUserId });
  allReadyFriends = allReadyFriends.map(({ participants }) => {
    return participants
      .find(({ _id }) => _id.toString() !== yourUserId.toString())
      .toString();
  });

  let users = await userModel
    .find({
      _id: { $ne: req.user._id },
      $or: [
        { username: { $regex: search, $options: "i" } }, // Case-insensitive name search
        { fullname: { $regex: search, $options: "i" } }, // Case-insensitive email search
      ],
    })
    .select("fullname avtar");
  users = users.map(({ _id, fullname, avtar }) => {
    return {
      _id,
      fullname,
      avtar,
      isMyFriend: allReadyFriends.includes(_id.toString()),
    };
  });

  res.status(200).json({ success: true, users });
});
