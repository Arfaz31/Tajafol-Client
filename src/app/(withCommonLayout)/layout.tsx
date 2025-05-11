import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <LenisProvider> */}
      <div className="flex min-h-screen flex-col">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </div>
      {/* </LenisProvider> */}
    </div>
  );
};

export default CommonLayout;
