import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  userInstancemethods,
  userStaticsMethods,
} from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import { Note } from "./notes.models";

const addressSchema = new Schema<IAddress>(
  {
    street: { type: String },
    city: { type: String },
    zipCode: { type: Number },
  },
  {
    _id: false, // Disable automatic _id field for subdocuments
  }
);

const userSchema = new Schema<IUser, userStaticsMethods, userInstancemethods>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
      minlength: 4,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 20,
    },
    age: {
      type: Number,
      required: true,
      min: [16, "Must be at least 6, got {VALUE}"],
      max: [80, "Must be at most 80, got {VALUE}"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
    address: {
      type: addressSchema,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Instance methods
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  this.password = password;
  return password;
});
// Static methods
userSchema.static("hashPassword", async function (plainPassword: string) {
  return await bcrypt.hash(plainPassword, 10);
});

//pre-save hook to hash password before saving
//document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//query middleware to log before find operation
userSchema.pre("find", async function (next) {
  // console.log("Pre find hook executed");
  next();
});

//post-save hook to log after saving
userSchema.post("save", async function (doc, next) {
  console.log("inside post save hook");
  console.log("%s has been saved", doc._id);
  next();
});
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    // console.log(doc);
    // console.log("User deleted:", doc._id);
    await Note.deleteMany({ userId: doc._id });
  }
  next();
});

userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, userStaticsMethods>("User", userSchema);
