import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import validator from "validator";

config();

const jwtPrivateSecret = `MIICXQIBAAKBgQDGKOLhzmEwYAMAGdIu/UBn5tO9rHS50DVo9LwDXGF2BsSnfYGg
HZcZY+ASAeoZqUDEFOqn2sNxPCfGzfSWtZQBAdWVqH37WZQIOb8dfg104vllatq6
kkRnrul9L6SbO9Skl23UnhIo8BMpaB1RD4cc3NIBNVHAtt+aFdVP81gKYQIDAQAB
AoGBALzDI+UP8FrhitokvqhOTHTtWFR9HDAI22fggdz9ukVxCxG1p647obzo/ACL
XFIXfX+LoUBGTxjlwcpKVKzfyVxCFm27RbnKPvjre/kcjVV3A8JjuL5v4XtM+rQO
u0PZIk6JaXSdXyPRbjzbGKB4bggJcrur1KlawBJgj0m4u5E1AkEA8Zrdg4UeUM1Q
ssJGKbNXrcoN8qxy4ybEWr2VBCd4OojZHTIdvCZDzR6bgFEFViGCIwB0NXBwbbJ4
CBmCdYIPvwJBANH3XNYXCSpqN7lsDoa8Jw5c8pIe+cgB0YIuTj7rprVX0b6TKjfk
jM1K1LwZdJ+6k4oe4nWDrKB7TrUMz1+obd8CQHVCAyY0sjznGLZZYXIVr4USHmjb
1zp1czDS+AK3ITvPdQgdbZ8GNzvTEgdZyyw9QQq5yqyw8G/dATJ1JwLe58MCQQCW
qt6fcmBNY3MhR30VCicsk14tpLSw5T0mIXxcglVag+4qxwfgm8y99Bi78bhSdlwx
HQB8O0TA1DsiiFK23fIZAkBfuNH+Zkv//txtl1VcqoK3Uc0A+FD+woTrl7+JQHfr
1Hgcfns8p2E7di6268Fv9RehOkDiWe6S75TUy02REZFB`.replace(/\\n/g, "\n");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email address"],
    required: [true, 'Email is required'],
    unique: true

  },
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    unique: false
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    unique: false
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
  },
  joinRecipe : [{type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next;

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.HASH)
  );
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, jwtPrivateSecret, {
    expiresIn: "10d",
    algorithm: "RS256",
  });
};

userSchema.statics.checkExistingField = async (field, value) => {
    const checkField = await User.findOne({ [`${field}`]: value });
  
    return checkField;
};

const User = mongoose.model("User", userSchema);

export default User;