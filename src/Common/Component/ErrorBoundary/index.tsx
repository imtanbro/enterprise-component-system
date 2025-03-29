import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <h2 style={styles.heading}>Something went wrong.</h2>
            <details style={styles.details}>
              {this.state.error && (
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {this.state.error.toString()}
                </p>
              )}
              <br />
              {this.state.errorInfo && (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  errorBox: {
    border: "1px solid red",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    width: "80%",
    maxWidth: "600px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  details: {
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default ErrorBoundary;
