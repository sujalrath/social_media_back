import {
    Comment,
  createModel,
  deleteById,
  deleteData,
  getAllData,
  getSingleData,
  getSingleDataById,
  handleErrorResponse,
  Notification,
  Post,
  ResponseMessage,
  sendResponse,
  StatusCodes,
  updateByIdApi,
  updateData,
} from "../Index.js";

export const getAllComments = async (req, res) => {
  try {
    const posts = await getAllData({}, Post);
    if (posts.length > 0) {
      sendResponse(res, StatusCodes.OK, ResponseMessage.POST_FETCHED, posts);
    } else {
      sendResponse(res, StatusCodes.OK, []);
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const posts = await getSingleDataById(postId, Post);
    if (posts) {
      sendResponse(res, StatusCodes.OK, ResponseMessage.POST_FETCHED, posts);
    } else {
      sendResponse(res, StatusCodes.OK, []);
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const addEditComment = async (req, res) => {
  try {
    const { content, postId, commentId,commentedBy,userId  } = req.body;
    const findPost = await getSingleData({_id:postId,is_deleted:false}, Post);
    if (findPost) {
      if (commentId) {
        const comment = await updateData(
          { post: postId, _id: commentId },
          { content },
          Comment
        );
        sendResponse(
          res,
          StatusCodes.OK,
          ResponseMessage.COMMENT_UPDATED,
          comment
        );
      } else {
        const createComment = await createModel(
          { content, author:commentedBy, post: postId },
          Comment
        );
        
        createComment.save()
        if (createComment) {
          const addNotification=await createModel({
            postId:postId,
            commentedBy:commentedBy,
            content:content,
            userId:userId
          },Notification)
          addNotification.save()
          sendResponse(
            res,
            StatusCodes.CREATED,
            ResponseMessage.NOTIFICATION_SEND,
            addNotification
          );
        }
      }
    }else{
        sendResponse(res, StatusCodes.OK, ResponseMessage.POST_NOT_FOUND);
    }

  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentIds } = req.body;
    
    
    if (!commentIds || !Array.isArray(commentIds)) {
      return sendResponse(res, StatusCodes.BAD_REQUEST, "Invalid comment IDs provided.", []);
    }

    const deletionPromises = commentIds.map(async (item) => {
      return await deleteData({ _id: item, is_deleted: true }, Comment);
    });

    const results = await Promise.all(deletionPromises);
    
    const commentDeleted = results.some(result => result); 

    if (commentDeleted) {
      sendResponse(res, StatusCodes.OK, ResponseMessage.COMMENT_DELETED, []);
    } else {
      sendResponse(res, StatusCodes.NOT_FOUND, ResponseMessage.FAILED_DELETED, []);
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
