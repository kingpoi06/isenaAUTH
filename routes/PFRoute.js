import express from "express";
import {
    getPFs,
    getPFById,
    createPF,
    updatePF,
    deletePF
} from "../controllers/PFs.js";
import { verifyPasien } from "../middleware/verifyPasien.js";

const router = express.Router();

router.get('/pasiens/pfs',verifyPasien,  getPFs);
router.get('/pasiens/pfs/:id', verifyPasien, getPFById);
router.post('/pasiens/pfs', verifyPasien,  createPF);
router.patch('/pasiens/pfs/:id',verifyPasien,  updatePF);
router.delete('/pasiens/pfs/:id',verifyPasien, deletePF);

export default router;