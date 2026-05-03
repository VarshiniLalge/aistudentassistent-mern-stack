import app from "./app.js";
import { initDB } from "./db.js";

const PORT = process.env.PORT || 4000;

// Start server after DB init
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ DB failed, but starting server anyway...");
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
