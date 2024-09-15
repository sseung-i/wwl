import { LoadingBox } from "@/components/common/Loading";
import {
  FetchNextPageOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

const useObserver = ({
  isFetching,
  fetchNextPage,
  hasNextPage,
}: {
  isFetching: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
  hasNextPage: boolean;
}) => {
  const observerEle = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerEle.current;

    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return isFetching ? (
    <LoadingBox />
  ) : (
    <div style={{ height: 100 }} ref={observerEle} />
  );
};

export default useObserver;
