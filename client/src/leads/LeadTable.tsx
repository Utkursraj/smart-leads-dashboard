import { Link } from "react-router-dom";
import type { Lead } from "../types/lead.types";
import { Button } from "../components/ui/Button";

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export const LeadTable = ({ leads, onEdit, onDelete }: LeadTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">No leads found</h3>
        <p className="mt-2 text-sm text-slate-500">
          Try changing your filters or create a new lead.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
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
              <tr key={lead._id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {lead.name}
                </td>

                <td className="px-4 py-3 text-slate-600">{lead.email}</td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
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