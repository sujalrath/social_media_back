import {
 
  getAllData,
  handleErrorResponse,
 
  Notification,
 
  ResponseMessage,
  sendResponse,
  StatusCodes,
 
} from "../Index.js";

export const getAllNotifications = async (req, res) => {
  try {
    const {userId}=req.body
    const posts = await getAllData({is_deleted:false,userId}, Notification,{ path: "commentedBy",
      select: "_id userName" }, { createdAt: -1  });
    if (posts.length > 0) {
      sendResponse(res, StatusCodes.OK, ResponseMessage.DATA_LIST, posts);
    } else {
      sendResponse(res, StatusCodes.OK, []);
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};


