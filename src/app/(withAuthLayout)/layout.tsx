import Container from "@/components/Shared/Container";

const WithAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-green-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-950 to-green-900/80" />

        {/* Organic shapes */}
        <div className="absolute w-[300px] h-[300px] bg-green-600/5 rounded-full blur-3xl top-1/4 -left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-3xl bottom-1/4 -right-1/4" />
        <div className="absolute w-[250px] h-[250px] bg-emerald-400/5 rounded-full blur-3xl top-3/4 left-1/2" />
      </div>

      {/* Main content */}
      <Container className="relative z-10">
        <div className="min-h-screen flex items-center justify-center py-4">
          {children}
        </div>
      </Container>
    </div>
  );
};

export default WithAuthLayout;
