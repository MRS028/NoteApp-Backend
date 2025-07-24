import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
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
});

const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {

    const body = req.body;
    const note = await Note.create(body);

//   const myNote = new Note({
//     title: "Learning SQL",
//     content: "I am learning SQL and it is very interesting.",
//     tags: {
//       label: "DBMS",
//       color: "gray"
//     }
//   });
//   await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note
  });
});

app.get("/notes/get-all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
    res.status(200).json({
        success: true,
        message: "All notes fetched successfully",
        notes
    });
});

app.get("/notes/get-note/:noteId", async (req: Request, res: Response) => {
  const noteId  = req.params.noteId;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Note fetched successfully",
    note
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome Good People.");
});

export default app;
