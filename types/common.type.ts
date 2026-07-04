// ─── Common Types ───────────────────────────────────────────────────────────
// Shared type definitions used across multiple services and components.

/** Standard paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Sort direction */
export type SortDirection = "asc" | "desc";
