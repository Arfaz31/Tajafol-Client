export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        {/* Text */}
        <p className="mt-4 text-muted-foreground">Loading....</p>
      </div>
    </div>
  );
}
