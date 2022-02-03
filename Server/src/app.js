const {
  userRoutes,
  authRoutes,
  reportsRoutes,
  locationRoutes,
  admRoutes,
} = require("./routes");

const setupRoutes = (app) => {
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);
};

module.exports = { setupRoutes };
