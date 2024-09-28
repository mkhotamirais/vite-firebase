import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  let content;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      content = <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      content = <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      content = <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      content = <div>🫖</div>;
    }
  } else content = <div>Something went wrong</div>;

  return <div className="min-h-screen w-full flex items-center justify-center text-2xl italic">{content}</div>;
}
