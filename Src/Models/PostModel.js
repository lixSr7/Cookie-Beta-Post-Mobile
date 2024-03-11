import ConectionDB from "../Config/Conection.js"; //* Import conection with database
ConectionDB(); //* Conection with database

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    Content: {
        type: String,
        // required: true
    },
    CreateAt: {
        type: Date,
        // required: true
    },
    IsDisable: {
        type: Boolean,
        // default: false
    },
    ImageURL: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    NickName: {
        type: String,
        // required: true
    },
    FullName: {
        type: String,
        // required: true
    },
    PhotoURL: {
        type: String,
        // required: true
    },
    lastLogin: {
        type: Date,
        // required: true
    },
    Post: postSchema
});

// postSchema.virtual('postId').get(function() {
//     return this._id.toHexString();
// });

const PostModel = mongoose.model('Post', userSchema);

export default PostModel;