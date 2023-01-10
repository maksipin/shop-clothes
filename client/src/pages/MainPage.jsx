import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import SectionCard from "../components/SectionCard";
import Slide from "../components/Slide";
import SectionLayout from "../layout/SectionLayout";
import { getTypes } from "../store/type";

const MainPage = () => {
  const types = useSelector(getTypes());
  return (
    <>
      <Slide />
      <SectionLayout>
        {types.map((item) => (
          <SectionCard key={item._id} to={`products/${item.type}`} {...item} />
        ))}
      </SectionLayout>
      <Post />
    </>
  );
};

export default MainPage;
