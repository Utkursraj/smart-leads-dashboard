import type { LeadFilters as LeadFiltersType } from "../types/lead.types";
import { Input } from "../components/ui/Input";

interface LeadFiltersProps {
  filters: LeadFiltersType;
  onChange: (filters: LeadFiltersType) => void;
}

export const LeadFilters = ({ filters, onChange }: LeadFiltersProps) => {
  return (
    <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-4">
      <Input
        label="Search"
        value={filters.search}
        onChange={(event) =>
          onChange({ ...filters, search: event.target.value, page: 1 })
        }
        placeholder="Search by name or email"
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Status</label>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as LeadFiltersType["status"],
              page: 1,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Source</label>
        <select
          value={filters.source}
          onChange={(event) =>
            onChange({
              ...filters,
              source: event.target.value as LeadFiltersType["source"],
              page: 1,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Sort</label>
        <select
          value={filters.sort}
          onChange={(event) =>
            onChange({
              ...filters,
              sort: event.target.value as LeadFiltersType["sort"],
              page: 1,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};