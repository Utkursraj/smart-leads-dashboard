import { Response } from "express";
import { Lead } from "../models/lead.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !email || !status || !source) {
      return res.status(400).json({
        success: false,
        message: "Name, email, status, and source are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const status = req.query.status as string | undefined;
    const source = req.query.source as string | undefined;
    const search = req.query.search as string | undefined;
    const sort = req.query.sort === "oldest" ? 1 : -1;

    const query: Record<string, unknown> = {
      createdBy: req.user.id,
    };

    if (status) query.status = status;
    if (source) query.source = source;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: sort }).skip(skip).limit(limit),
      Lead.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

export const getLeadById = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      createdBy: req.user?.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};

export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user?.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user?.id,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};

export const exportLeadsCsv = async (req: AuthRequest, res: Response) => {
  try {
    const leads = await Lead.find({
      createdBy: req.user?.id,
    }).sort({ createdAt: -1 });

    const csvHeader = "Name,Email,Status,Source,Created At\n";

    const csvRows = leads
      .map((lead) => {
        return `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${lead.createdAt.toISOString()}"`;
      })
      .join("\n");

    res.header("Content-Type", "text/csv");
    res.attachment("smart-leads.csv");

    return res.send(csvHeader + csvRows);
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to export CSV",
    });
  }
};