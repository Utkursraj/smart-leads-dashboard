import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import { getLeadById } from "../services/lead.service";
import type { Lead } from "../types/lead.types";

export const LeadDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getLeadById(id);
        setLead(data);
      } catch {
        setError("Failed to load lead details.");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="mb-5">
        <Link to="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {lead && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
          <p className="mt-1 text-slate-500">{lead.email}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 font-semibold text-slate-900">{lead.status}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Source</p>
              <p className="mt-1 font-semibold text-slate-900">{lead.source}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Created At</p>
              <p className="mt-1 font-semibold text-slate-900">
                {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};