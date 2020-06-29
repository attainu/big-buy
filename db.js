import { connect } from "mongoose";

export const dbConnect = (MONGODB_URI, MONGODB_PASSWORD) =>
  connect(MONGODB_URI.replace("<password>", MONGODB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
