import React from "react";

const SectionLayout = ({ children }) => {
  return (
    <div className="m-auto flex justify-center flex-wrap  max-w-screen-2xl">
      {children}
    </div>
  );
};

export default SectionLayout;
