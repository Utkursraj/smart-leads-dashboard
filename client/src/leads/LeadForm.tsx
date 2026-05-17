import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Lead, LeadPayload, LeadSource, LeadStatus } from "../types/lead.types";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

interface LeadFormProps {
  selectedLead: Lead | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (payload: LeadPayload) => void;
}

export const LeadForm = ({
  selectedLead,
  loading,
  onCancel,
  onSubmit,
}: LeadFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [source, setSource] = useState<LeadSource>("Website");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedLead) {
      setName(selectedLead.name);
      setEmail(selectedLead.email);
      setStatus(selectedLead.status);
      setSource(selectedLead.source);
    } else {
      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");
    }
  }, [selectedLead]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    onSubmit({ name, email, status, source });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        {selectedLead ? "Update Lead" : "Create Lead"}
      </h2>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Input
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Lead name"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="lead@example.com"
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as LeadStatus)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Source</label>
          <select
            value={source}
            onChange={(event) => setSource(event.target.value as LeadSource)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        {selectedLead && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : selectedLead ? "Update Lead" : "Create Lead"}
        </Button>
      </div>
    </form>
  );
};