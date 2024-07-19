import { mongoose } from "../Index.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
   bio:{
    type:String,
    required:false
   },
    is_deleted: {
      type: Number,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },


  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export { User };
