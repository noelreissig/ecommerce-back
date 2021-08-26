const Tweet = require("../models/Tweet");
const User = require("../models/User");
const formidable = require("formidable");
const moment = require("moment");
const jwt = require("jsonwebtoken");
module.exports = {
  usersAll: async (req, res) => {
    const users = await User.find({}).populate("follows").populate("followers");
    res.json({ users });
  },
  tweetsAll: async (req, res) => {
    const tweets = await Tweet.find({}).populate("author").populate("likes");
    res.json({ tweets });
  },
  tweetsIFollow: async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const tweets = await Tweet.find({
      $or: [{ author: { $in: user.follows } }, { author: user.id }],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("author")
      .populate("likes");
    res.json({ tweets });
  },
  showUser: async (req, res) => {
    const usuario = await User.findOne({ username: req.params.username })
      .populate("followers")
      .populate("follows");
    const tweets = await Tweet.find({ author: usuario._id })
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("likes");
    res.json({ usuario, tweets });
  },
  register: async (req, res) => {
    const form = formidable({
      multiples: true,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const path = require("path");
      const imgName = path.basename(files.image.path);
      if (files.image.name === "") {
        const fs = require("fs");
        fs.unlink(files.image.path, () => {});
      }
      const user = await User.findOne({
        username: fields.username,
      });
      if (user) {
      } else {
        const addUser = await new User({
          firstname: fields.firstname,
          lastname: fields.lastname,
          username: fields.username,
          email: fields.email,
          password: fields.password,
          description: fields.description,
          profilePic: "/img/" + imgName,
        });
        await addUser.save();
        console.log(addUser);
        addUser.token = jwt.sign(
          { sub: { username: fields.username, id: addUser._id } },
          "unStringSuperJumbo"
        );
        res.json(addUser);
      }
    });
  },

  profilePic: async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const img = user.profilePic;
    res.sendFile(process.env.DB_PROFILE_PIC + img);
  },
  mayLike: async (req, res) => {
    const profiles = await User.find({}).limit(7);
    res.json({ profiles });
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!(username && password)) {
        res.status(400).send("All inputs are required");
      }
      const user = await User.findOne({ username });
      if (!(await user.validPassword(password))) {
        res.status(400).send("Invalid credentials");
      } else {
        user.token = jwt.sign(
          { sub: { username: req.body.username, id: user._id } },
          "unStringSuperJumbo"
        );
        res.json(user);
      }
    } catch (err) {
      console.log(err);
    }
  },
  like: async (req, res) => {
    const userId = req.body.userId;
    const tweet = await Tweet.findById(req.body.tweetId);
    if (!tweet.likes.some((arrVal) => userId === arrVal.toString())) {
      await Tweet.findByIdAndUpdate(tweet._id, {
        $push: {
          likes: userId,
        },
      });
      const showTweet = await Tweet.findById(req.body.tweetId);
      res.json(showTweet);
    } else {
      await Tweet.findByIdAndUpdate(tweet._id, {
        $pull: {
          likes: userId,
        },
      });
      const showTweet = await Tweet.findById(req.body.tweetId);
      res.json(showTweet);
    }
  },
  follow: async (req, res) => {
    const { followUser, currentUser } = req.body;
    const user = await User.findOne({ username: currentUser });
    const followId = await User.findOne({ username: followUser })
      .populate("followers")
      .populate("follows");
    if (
      !user.follows.some(
        (arrVal) => followId._id.toString() === arrVal._id.toString()
      )
    ) {
      await User.findByIdAndUpdate(user._id, {
        $push: {
          follows: followId._id,
        },
      });
      await User.findByIdAndUpdate(followId._id, {
        $push: {
          followers: user._id,
        },
      });
      res.redirect("back");
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: {
          follows: followId._id,
        },
      });
      await User.findByIdAndUpdate(followId._id, {
        $pull: {
          followers: user._id,
        },
      });
    }
  },
  store: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    let user = {};
    jwt.verify(token, "unStringSuperJumbo", function (err, decoded) {
      user = decoded.sub;
    });
    const newTweet = await new Tweet({
      author: user.id,
      content: req.body.content,
    });
    await newTweet.save();
    const tweet = await Tweet.findById(newTweet.id).populate("author");
    res.json(tweet);
  },
  destroy: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    let user = {};
    jwt.verify(token, "unStringSuperJumbo", function (err, decoded) {
      user = decoded.sub;
    });
    const tweet = await Tweet.findById(req.body.tweetId);
    if (user.id === tweet.author.toString()) {
      await Tweet.findByIdAndDelete(req.body.tweetId);
    }
  },
};
