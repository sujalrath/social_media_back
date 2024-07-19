import { mongoose } from "../Index.js";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    postImage: {
      type: Array,
      required: false,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
export { Post };
