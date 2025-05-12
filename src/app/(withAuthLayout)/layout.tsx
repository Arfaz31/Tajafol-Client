import Container from "@/components/Shared/Container";

const WithAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
   <div className="relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dufs2ywc7/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1747044314/rajendra-biswal-BafVsMpoSF0-unsplash_kbnhgl.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-gray-800/60" />

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
