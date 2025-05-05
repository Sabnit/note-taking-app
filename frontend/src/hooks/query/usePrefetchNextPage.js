import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * A reusable hook to prefetch the next page of data
 */
export const usePrefetchNextPage = ({
  currentOptions,
  data,
  getQueryKey,
  fetchFn,
  enabled = true,
  additionalOptions = {},
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!data || !enabled) return;

    if (data.pagination.hasNextPage === false) {
      return;
    }

    const nextPageOptions = {
      ...currentOptions,
      page: currentOptions.page + 1,
    };

    queryClient.prefetchQuery({
      queryKey: getQueryKey(nextPageOptions),
      queryFn: () => fetchFn(nextPageOptions),
      ...additionalOptions,
    });
  }, [
    data,
    currentOptions,
    getQueryKey,
    fetchFn,
    queryClient,
    enabled,
    additionalOptions,
  ]);
};
