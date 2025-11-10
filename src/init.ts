import express, { Request, Response, NextFunction } from "express";
import pokemonRoute from "./routes/PokemonRoute";
import healthRoute from "./routes/HealthRoute";
import readinessRoute from "./routes/ReadinessRoute";
import startupRoute from "./routes/StartupRoute";
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());


app.use(pokemonRoute);
app.use(healthRoute);
app.use(readinessRoute);
app.use(startupRoute);


app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Error interno" });
});

export default app;

