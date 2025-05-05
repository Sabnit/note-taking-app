import { BaseModel } from "./Base.model.js";

/**
 * Model for User Operations
 */
class UserModel extends BaseModel {
  constructor() {
    super("user");
  }

  async create(user) {
    return super.create(user);
  }

  async findById(id) {
    const whereClause = { id };
    return super.findById(whereClause);
  }

  async findByEmail(email) {
    return super.findByEmail(email);
  }
}

export const userModel = new UserModel();
