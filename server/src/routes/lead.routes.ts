import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createLead,
  deleteLead,
  exportLeadsCsv,
  getLeadById,
  getLeads,
  updateLead,
} from "../controllers/lead.controller";

const router = Router();

router.use(protect);

router.get("/export/csv", exportLeadsCsv);

router.route("/").get(getLeads).post(createLead);

router.route("/:id").get(getLeadById).put(updateLead).delete(deleteLead);

export default router;