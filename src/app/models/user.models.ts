import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";


const userSchema = new Schema<IUser>({
  firstName: { 
    type: String, 
    trim: true,
    required: [true, 'First name is required'],
    minlength: 4,
    maxlength: 20
  },
  lastName: { 
    type: String, 
    required: true ,
    trim: true,
    minlength: 4,
    maxlength: 20
  },
  age: {
    type: Number,
    required: true,
    min: [16, 'Must be at least 6, got {VALUE}'],
    max: [80, 'Must be at most 80, got {VALUE}']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is not a valid role'
    }, 
    default: "user" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});


export const User = model("User", userSchema);