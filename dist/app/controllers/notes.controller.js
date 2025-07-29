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
exports.notesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notes_models_1 = require("../models/notes.models");
exports.notesRoutes = express_1.default.Router();
exports.notesRoutes.post("/create-note", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const note = yield notes_models_1.Note.create(body);
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
}));
exports.notesRoutes.get("/get-all-notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_models_1.Note.find().populate("user");
    res.status(200).json({
        success: true,
        message: "All notes fetched successfully",
        notes
    });
}));
//update a note by id
exports.notesRoutes.patch("/get-note/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = yield notes_models_1.Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
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
}));
//delete a note by id
exports.notesRoutes.delete("/delete-note/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const note = yield notes_models_1.Note.findByIdAndDelete(noteId);
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
}));
