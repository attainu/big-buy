import mongoose from "mongoose";
const { MONGODB_URI, MONGODB_PASSWORD } = process.env;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(MONGODB_URI.replace("<password>", MONGODB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(({ message }) => {
    console.log(message);
  });
