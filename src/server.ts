import app from "./init";

const PORT = process.env.APP_PORT ?? 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));