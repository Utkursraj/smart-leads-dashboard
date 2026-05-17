import { api } from "./api";
import type {
  Lead,
  LeadFilters,
  LeadPayload,
  LeadsResponse,
} from "../types/lead.types";

export const getLeads = async (
  filters: LeadFilters
): Promise<LeadsResponse> => {
  const { data } = await api.get<LeadsResponse>("/leads", {
    params: {
      page: filters.page,
      limit: 10,
      status: filters.status || undefined,
      source: filters.source || undefined,
      search: filters.search || undefined,
      sort: filters.sort,
    },
  });

  return data;
};

export const getLeadById = async (id: string): Promise<Lead> => {
  const { data } = await api.get<{ data: Lead }>(`/leads/${id}`);
  return data.data;
};

export const createLead = async (payload: LeadPayload): Promise<Lead> => {
  const { data } = await api.post<{ data: Lead }>("/leads", payload);
  return data.data;
};

export const updateLead = async (
  id: string,
  payload: LeadPayload
): Promise<Lead> => {
  const { data } = await api.put<{ data: Lead }>(`/leads/${id}`, payload);
  return data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsCsv = async (): Promise<Blob> => {
  const { data } = await api.get("/leads/export/csv", {
    responseType: "blob",
  });

  return data;
};