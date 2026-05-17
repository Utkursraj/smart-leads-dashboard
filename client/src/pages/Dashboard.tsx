import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { LeadFilters } from "../leads/LeadFilters";
import { LeadForm } from "../leads/LeadForm";
import { LeadTable } from "../leads/LeadTable";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import {
  createLead,
  deleteLead,
  exportLeadsCsv,
  getLeads,
  updateLead,
} from "../services/lead.service";
import { useDebounce } from "../hooks/useDebounce";
import { downloadCsv } from "../utilities/downloadCsv";
import type {
  Lead,
  LeadFilters as LeadFiltersType,
  LeadPayload,
  PaginationMeta,
} from "../types/lead.types";

const defaultFilters: LeadFiltersType = {
  status: "",
  source: "",
  search: "",
  sort: "latest",
  page: 1,
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("smart_leads_token");
  const isLoggedIn = Boolean(token);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<LeadFiltersType>(defaultFilters);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchLeads = async () => {
    if (!isLoggedIn) {
      setLeads([]);
      setPagination({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getLeads({
        ...filters,
        search: debouncedSearch,
      });

      setLeads(response.data);
      setPagination(response.pagination);
    } catch {
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    filters.status,
    filters.source,
    filters.sort,
    filters.page,
    debouncedSearch,
    isLoggedIn,
  ]);

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (payload: LeadPayload) => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }

    try {
      setFormLoading(true);
      setError("");

      if (selectedLead) {
        await updateLead(selectedLead._id, payload);
      } else {
        await createLead(payload);
      }

      setSelectedLead(null);
      await fetchLeads();
    } catch {
      setError("Failed to save lead. Please check the details and try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmed) return;

    try {
      setError("");
      await deleteLead(id);
      await fetchLeads();
    } catch {
      setError("Failed to delete lead. Please try again.");
    }
  };

  const handleExport = async () => {
    if (!isLoggedIn) {
      redirectToLogin();
      return;
    }

    try {
      const blob = await exportLeadsCsv();
      downloadCsv(blob, "smart-leads.csv");
    } catch {
      setError("Failed to export CSV. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, filter, and export your sales leads.
          </p>
        </div>

        <Button onClick={handleExport}>
          {isLoggedIn ? "Export CSV" : "Login to Export CSV"}
        </Button>
      </div>

      {!isLoggedIn && (
        <div className="mb-5 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
          Login to create leads, export CSV, and view your private lead data.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <LeadForm
          selectedLead={selectedLead}
          loading={formLoading}
          onCancel={() => setSelectedLead(null)}
          onSubmit={handleSubmit}
        />

        <LeadFilters filters={filters} onChange={setFilters} />

        {loading ? (
          <Loader />
        ) : (
          <>
            <LeadTable
              leads={leads}
              onEdit={(lead) => {
                if (!isLoggedIn) {
                  redirectToLogin();
                  return;
                }

                setSelectedLead(lead);
              }}
              onDelete={handleDelete}
            />

            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Page {pagination.page} of {pagination.totalPages} ·{" "}
                {pagination.total} leads
              </p>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  disabled={filters.page <= 1}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: prev.page - 1,
                    }))
                  }
                >
                  Previous
                </Button>

                <Button
                  variant="secondary"
                  disabled={filters.page >= pagination.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: prev.page + 1,
                    }))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};