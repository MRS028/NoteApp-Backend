import express  from 'express';
import { Request, Response } from 'express';
import { Note } from '../models/notes.models';

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {

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

notesRoutes.get("/get-all-notes", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");
    res.status(200).json({
        success: true,
        message: "All notes fetched successfully",
        notes
    });
});
//update a note by id
notesRoutes.patch("/get-note/:noteId", async (req: Request, res: Response) => {
  const noteId  = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId,updatedBody,{ new: true });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note
  });
});

//delete a note by id
notesRoutes.delete("/delete-note/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId);
  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    note
  });
});