import {
  bcryptjs,
  createModel,
  getAllData,
  getSingleData,
  handleErrorResponse,
  hashedPassword,
  jwt,
  LocalStrategy,
  passport,
  passwordCompare,
  ResponseMessage,
  sendResponse,
  StatusCodes,
  updateByIdApi,
  updateData,
  User,
} from "../Index.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const comparePassword = await passwordCompare(password, user.password);
        if (comparePassword) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const userEmail = await getSingleData({ email }, User);
    const finduserName = await getSingleData({ userName }, User);
    if (userEmail) {
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessage.EMAIL_ALREADY_EXIST
      );
    } else if (finduserName) {
      sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessage.USERNAME_ALREADY_EXIST
      );
    } else {
      const hashPassword = await hashedPassword(password);
      const userData = await createModel(
        { email, userName, password: hashPassword },
        User
      );

      await userData.save();

      sendResponse(res, StatusCodes.CREATED, ResponseMessage.USER_CREATED);
    }
  } catch (err) {
    handleErrorResponse(res, error);
  }
};

export const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    passport.authenticate(
      "local",
      { session: false },
      async (err, user, info) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: ResponseMessage.INTERNAL_SERVER_ERROR });
        }
        if (!user) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: info.message });
        }

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        return res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: ResponseMessage.USER_LOGGED_IN,
          data: {
            user: {
              id: user._id,
              email: user.email,
              userName: user.userName,
              profile: user.profile,
            },
            token: token,
          },
        });
      }
    )(req, res);
  } catch (error) {
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: [error.message],
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allusers = await getAllData({ is_deleted: false }, User, null, {
      createdAt: -1,
    });

    if (allusers.length > 0) {
      //

      sendResponse(res, StatusCodes.OK, ResponseMessage.USER_LIST, allusers);
    } else {
      sendResponse(res, StatusCodes.OK, []);
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const editProfile = async (req, res) => {
  const { email, profile, userName } = req.body;
  const userId = req.user; 
  try {
    const existingUser = await getSingleData({ _id: userId }, User);

    if (!existingUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }
    if (existingUser.email === email && existingUser.userName === userName) {
      existingUser.profile =  req.profile ? req.profile : profile;
      await updateByIdApi(userId,existingUser, User);
      console.log("first")
      sendResponse(res,StatusCodes.OK,ResponseMessage.DATA_UPDATED,existingUser)
    }

    if (existingUser.userName !== userName) {
      const usernameExists = await getSingleData({ userName }, User);
      console.log("second")

      if (usernameExists && usernameExists._id.toString() !== userId) {
        sendResponse(res,StatusCodes.BAD_REQUEST,ResponseMessage.USER_ALREADY_EXIST,existingUser)

      }
    }

    if (existingUser.email !== email) {
      const emailExists = await getSingleData({ email }, User);

      if (emailExists && emailExists._id.toString() !== userId) {
        sendResponse(res,StatusCodes.BAD_REQUEST,ResponseMessage.EMAIL_ALREADY_EXIST,existingUser)
      }
    }
    else{
      console.log("third")

      existingUser.email = email;
      existingUser.userName = userName;
      existingUser.profile = req.profile ? req.profile : profile;
      await updateByIdApi(userId,existingUser, User);
  
      sendResponse(res,StatusCodes.OK,ResponseMessage.DATA_UPDATED,existingUser)
      return res.status(StatusCodes.OK).json({ message: ResponseMessage.DATA_UPDATED });
    }

   
  } catch (error) {
    console.error('Error:', error);
handleErrorResponse(res,error)  }
};