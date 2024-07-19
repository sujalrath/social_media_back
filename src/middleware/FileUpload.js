// import {multer} from '../Index.js'

import multer from "multer";


var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        let path = '';

        if (request.files?.profile?.length) {
            path = "public/uploads/userProfile";
        }

        if (request.files?.postImage?.length) {
            path = "public/uploads/posts";
        }

        // if (!fs.existsSync(path)) {
        //     fs.mkdirSync(path, { recursive: true });
        // }
        callback(null, path);
    },
    filename: function (request, file, callback) {
        var ext = file.originalname.split(".");
        callback(
            null,
            Date.now() +
            (Math.random() + 1).toString(36).substring(7) + "-" + ext[0] +
            "." +
            ext[ext.length - 1]
        );
    },
});

var upload = multer({ storage }).fields([
    {
        name: "profile",
        maxCount: Infinity
    },

    {
        name: "postImage",
        maxCount: 1,
    },

]);

export default function (req, res, next) {
    upload(req, res, (error) => {
        if (error) {
            res.status(400).send(error.message);
        } else {
            if (req.files) {
                const image = req.files.profile ? req.files.profile[0].filename : '';
                req.profile = image;

                // const postImage = req.files.postImage ? req.files.postImage[0].filename : '';
                // req.postImage = postImage;

                const postImage = req.files.postImage || [];
                req.postImage = postImage.map((file) => file.filename);

                next();
            } else {
                next();
            }
        }
    });
};

