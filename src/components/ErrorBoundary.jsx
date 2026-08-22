import { Component } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

/**
 * Catches render/lifecycle errors anywhere below it and shows a recoverable
 * fallback instead of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Replace with a real reporter (Sentry etc.) when one is wired up.
    console.error("Uncaught render error:", error, info?.componentStack);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-2 px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-soft">
            <AlertTriangle className="h-8 w-8 text-danger" />
          </div>

          <h1 className="text-fluid-3xl font-bold text-fg">
            Something went wrong
          </h1>
          <p className="mt-3 text-fluid-base text-fg-muted">
            An unexpected error stopped this page from rendering. You can retry,
            or head back to the homepage.
          </p>

          {import.meta.env.DEV && (
            <pre className="mt-6 max-h-48 overflow-auto rounded-xl bg-surface-3 p-4 text-left text-xs text-danger thin-scrollbar">
              {error.message}
              {"\n"}
              {error.stack}
            </pre>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={this.handleReset}
              className="tap inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
            <a
              href="/"
              className="tap inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 font-semibold text-fg transition hover:bg-surface-3"
            >
              <Home className="h-4 w-4" />
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
