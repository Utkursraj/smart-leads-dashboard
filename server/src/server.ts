import { connectDB } from "./config/db";
import { app } from "./app";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();