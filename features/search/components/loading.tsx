//======================================
export function Loading({
  isFetching,
  hasData,
  Skeleton,
}: {
  isFetching: boolean;
  hasData: boolean;
  Skeleton: React.ReactNode;
}) {
  if (!isFetching) return null;

  const fetchingWithData = isFetching && hasData;
  const fetchingWithoutData = isFetching && !hasData;

  if (fetchingWithData)
    return <div className="py-1 text-center">Searching for new data... </div>;
  if (fetchingWithoutData) return <>{Skeleton}</>;

  return null;
}
