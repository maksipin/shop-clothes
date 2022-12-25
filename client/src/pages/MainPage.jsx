import React from "react";
import Post from "../components/Post";
import Slide from "../components/Slide";
import SectionLayout from "../layout/SectionLayout";

const MainPage = () => {
  return (
    <>
      <Slide />

      <div className="flex-auto">
        <SectionLayout />
      </div>
      <div>
        <Post />
      </div>
    </>
  );
};

export default MainPage;
