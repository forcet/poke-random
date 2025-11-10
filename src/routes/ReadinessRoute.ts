import { Router } from "express";

const router = Router();

router.get('/readiness', (_req, res) => {
    res.status(200).send("its OK!");
});

export default router;