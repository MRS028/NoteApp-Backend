import { model, Schema } from "mongoose";
import { INote } from "../interfaces/notes.interface";

const noteSchema = new Schema<INote>({
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
}, {
  timestamps: true,
  versionKey: false
}
);

export const Note = model<INote>("Note", noteSchema);