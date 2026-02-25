require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 API escuchando en puerto ${PORT}`));
  } catch (err) {
    console.error("❌ Error levantando servidor:", err.message);
    process.exit(1);
  }
})();