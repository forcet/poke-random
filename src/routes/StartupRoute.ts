import { Router } from "express";

const router = Router();

router.get('/startup', (_req, res) => {
    res.status(200).send("its OK!");
});

export default router;