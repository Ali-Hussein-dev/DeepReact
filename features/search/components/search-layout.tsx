import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "react-error-boundary";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert" className="w-full space-y-2 px-2 py-4">
      <p className="text-nowrap">Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
export const SearchLayout = ({
  children,
  sidebar,
  rightsidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  rightsidebar?: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-1">
      <div className="lg:col-span-2">{sidebar}</div>
      <ErrorBoundary
        fallbackRender={(p) => fallbackRender(p)}
        onError={(e) => {
          console.warn(e);
        }}
      >
        <div className="grow px-2 pb-3 md:px-0 lg:col-span-8">{children}</div>
      </ErrorBoundary>
      <div className="lg:col-span-2">{rightsidebar}</div>
    </div>
  );
};
