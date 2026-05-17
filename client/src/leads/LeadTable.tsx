import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";

import type { Lead } from "../types/lead.types";
import { Button } from "../components/ui/Button";

interface LeadTableProps {
  leads: Lead[];
  isLoggedIn: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export const LeadTable = ({
  leads,
  isLoggedIn,
  onEdit,
  onDelete,
}: LeadTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Inbox size={28} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          {isLoggedIn ? "No leads yet" : "Private lead dashboard"}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          {isLoggedIn
            ? "Create your first lead to start managing your sales pipeline."
            : "Login to view your private leads, create new records, export CSV files, and manage your pipeline securely."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead._id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {lead.name}
                </td>

                <td className="px-4 py-3 text-slate-600">{lead.email}</td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {lead.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-600">{lead.source}</td>

                <td className="px-4 py-3 text-slate-600">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>

                <td className="space-x-2 px-4 py-3 text-right">
                  <Link to={`/leads/${lead._id}`}>
                    <Button variant="secondary">View</Button>
                  </Link>

                  <Button variant="secondary" onClick={() => onEdit(lead)}>
                    Edit
                  </Button>

                  <Button variant="danger" onClick={() => onDelete(lead._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};