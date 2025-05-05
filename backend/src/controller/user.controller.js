import * as userServices from "../services/user.service.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    const user = await userServices.getCurrentUser(accessToken);

    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = parseInt(id);

    const user = await userServices.getUserById(userId);

    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const userId = parseInt(id);

    const updatedUser = await userServices.updateUser(userId, body);

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = parseInt(id);

    const user = await userServices.deleteUser(userId);

    return res.status(204).json({
      status: "success",
      message: `User: "${user}" has been removed successfully`,
    });
  } catch (error) {
    next(error);
  }
};
