import { jwt, StatusCodes, ResponseMessage, sendResponse, User } from '../Index.js';

export async function Auth(req, res, next) {
    const token = req.header("auth");
    if (!token) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.TOKEN_NOT_AUTHORIZED, []);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;
        if (userId) {
            const user = await User.findOne({ _id: userId });

            if (user) { 
                if (!user.isActive) {
                    return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.USER_DISABLE_BY_ADMIN, []);
                }

                if (!user.is_deleted && user.isActive) {
                    req.user = userId;
                    return next();
                }
            }
        
        } else {
            throw new Error("Token not valid");
        }

        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.TOKEN_NOT_AUTHORIZED, []);
    } catch (error) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, ResponseMessage.TOKEN_NOT_VALID_AUTHORIZED, []);
    }
}
