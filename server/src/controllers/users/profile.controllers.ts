import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/user.models";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  const userProfile = await User.findById({ _id: userId });

  return res.status(200).json({
    message: "User profile found",
    data: userProfile,
    success: true,
  });
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const id = req.userId;

  const { password, retry_password, ...otherUpdates } = req.body;
  console.log(otherUpdates);

  try {
    const updates: any = { ...otherUpdates };

    // 🔐 If password update requested
    if (password || retry_password) {
      if (!password || !retry_password) {
        return res.status(400).json({
          success: false,
          message: "Both password fields are required",
        });
      }

      const user = await User.findOne({ _id: id }).select("+password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // const isMatch = await user.comparePassword(password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("user.password: ", user.password);
      console.log("isMatch: ", isMatch);

      // hash password
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const hashedPassword = await bcrypt.hash(retry_password, 10);

      user.password = hashedPassword;
      console.log("retry_password: ", retry_password);
      console.log("hashedPassword: ", hashedPassword);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
        data: user,
      });
    }

    const updatedUserProfile = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password"); // don't return password

    if (!updatedUserProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUserProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update User profile",
      error,
    });
  }
};
