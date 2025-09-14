import bookRepo from "@/api/book.repo";
import { queryKeys } from "@/lib/queryKeys";
import { QueryOptions, useQuery } from "@tanstack/react-query";

export const useGetBookDetail = (id: string, options: QueryOptions = {}) => {
  return useQuery({
    queryKey: queryKeys.book.detail(id),
    queryFn: () => bookRepo.getBook(id),
    ...options,
  });
};
