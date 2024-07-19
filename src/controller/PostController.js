import {
    Comment,
    createModel,
    deleteById,
    getAllData,
    getSingleData,
    getSingleDataById,
    handleErrorResponse,
    Post,
    ResponseMessage,
    sendResponse,
    StatusCodes,
    updateByIdApi,
    updateData,
} from "../Index.js";

export const getAllPost = async (req, res) => {
    try {
        const posts = await getAllData({ is_deleted: false }, Post, {
            path: "author",
            select: "_id userName email profile"
        }, { createdAt: -1 });
        if (posts.length > 0) {
            const postsWithComments = await Promise.all(posts.map(async (item) => {
                const comments = await getAllData({ post: item._id, is_deleted: false }, Comment, {
                    path: "author",
                    select: "_id userName email profile"
                }, { createdAt: -1 });
                return {
                    ...item.toObject(),
                    comments
                };
            }));

            sendResponse(res, StatusCodes.OK, ResponseMessage.POST_FETCHED, postsWithComments);
        } else {
            sendResponse(res, StatusCodes.OK, []);
        }
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.id

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

export const addEditPost = async (req, res) => {
    try {
        const { content, author, postId } = req.body;

        if (postId) {
            const postData = await getSingleDataById(postId, Post);
            if (postData) {


                const post = await updateByIdApi(postId, {

                    content
                    , author,
                    postImage: postData.postImage

                }, Post);
                sendResponse(res, StatusCodes.OK, ResponseMessage.POST_UPDATED, post);
            } else {
                sendResponse(res, StatusCodes.OK, ResponseMessage.DATA_NOT_FOUND, []);
            }


        } else {
            const post = await createModel({ content, author, postImage: req.postImage }, Post);
            post.save()
            if (post) {
                sendResponse(res, StatusCodes.CREATED, ResponseMessage.POST_CREATED, post);
            } else {
                sendResponse(res, StatusCodes.BAD_REQUEST, ResponseMessage.FAILED_TO_CREATED, []);
            }
        }

    } catch (error) {
        handleErrorResponse(res, error);
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.body

        const posts = await deleteById(postId, Post);
        if (posts) {
            sendResponse(res, StatusCodes.OK, ResponseMessage.POST_FETCHED, posts);
        } else {
            sendResponse(res, StatusCodes.OK, []);
        }
    } catch (error) {
        handleErrorResponse(res, error);
    }
};