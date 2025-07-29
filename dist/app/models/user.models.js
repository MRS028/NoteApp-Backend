"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const notes_models_1 = require("./notes.models");
const addressSchema = new mongoose_1.Schema({
    street: { type: String },
    city: { type: String },
    zipCode: { type: Number },
}, {
    _id: false, // Disable automatic _id field for subdocuments
});
const userSchema = new mongoose_1.Schema({
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
            validator: function (value) {
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
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
// Instance methods
userSchema.method("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        this.password = password;
        return password;
    });
});
// Static methods
userSchema.static("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(plainPassword, 10);
    });
});
//pre-save hook to hash password before saving
//document middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
//query middleware to log before find operation
userSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("Pre find hook executed");
        next();
    });
});
//post-save hook to log after saving
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inside post save hook");
        console.log("%s has been saved", doc._id);
        next();
    });
});
userSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            // console.log(doc);
            // console.log("User deleted:", doc._id);
            yield notes_models_1.Note.deleteMany({ userId: doc._id });
        }
        next();
    });
});
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
