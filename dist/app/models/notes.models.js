"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, default: "No Content" },
    category: {
        type: String,
        enum: ["Personal", "Work", "Personal", "Study", "Other"],
        default: "Personal",
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "green" }
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.Note = (0, mongoose_1.model)("Note", noteSchema);
