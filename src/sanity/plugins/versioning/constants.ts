export const MAX_SNAPSHOTS_PER_DOC = 50;
export const MAX_UNDO_STEPS = 100;
export const UNDO_DEBOUNCE_MS = 600;

export const SYSTEM_FIELDS = new Set([
  "_id",
  "_type",
  "_rev",
  "_createdAt",
  "_updatedAt",
  "_key",
]);
