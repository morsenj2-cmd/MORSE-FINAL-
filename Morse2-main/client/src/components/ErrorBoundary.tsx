import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div className="bg-black w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/50 text-lg mb-4">Something went wrong.</p>
            <button
              onClick={() => window.location.reload()}
              className="text-white/70 hover:text-white underline text-sm"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ClerkGuard({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return <ErrorBoundary fallback={fallback || null}>{children}</ErrorBoundary>;
}
