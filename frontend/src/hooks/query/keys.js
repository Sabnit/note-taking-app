/**
 *   Note Query Keys
 */
export const noteKeys = {
  all: ["notes"],
  lists: () => [...noteKeys.all, "list"],
  list: (filters) => [...noteKeys.lists(), { filters }],
  details: () => [...noteKeys.all, "detail"],
  detail: (id) => [...noteKeys.details(), id],
};

/**
 *  Category Query Keys
 */
export const categoryKeys = {
  all: ["categories"],
  lists: () => [...categoryKeys.all, "list"],
  list: () => [...categoryKeys.lists()],
  details: () => [...categoryKeys.all, "detail"],
  detail: (id) => [...categoryKeys.details(), id],
  notes: () => [...categoryKeys.all, "notes"],
  categoryNotes: (id, options) => [...categoryKeys.notes(), id, { options }],
};
