import {model} from "mongoose";

import {UsersSchema} from  "../schemas/UsersSchema.js";

export const UsersModel = model("user",UsersSchema);

