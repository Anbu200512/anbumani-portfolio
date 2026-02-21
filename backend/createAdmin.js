import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {
      console.log("Admin already exists ✅");
      process.exit();
    }

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin Created Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();