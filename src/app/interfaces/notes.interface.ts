import { Types } from "mongoose";

export interface INote {
  id: string;
  title: string;
  content: string;
  category: "Personal" | "Work" | "Study" | "Other";
pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
  user: Types.ObjectId;
}