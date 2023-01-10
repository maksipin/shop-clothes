import React from "react";
import { useSelector } from "react-redux";
import SectionCard from "../components/SectionCard";
import { getTypes } from "../store/type";
import SectionLayout from "./SectionLayout";

const ProductLayout = () => {
  const types = useSelector(getTypes());
  return (
    <div className="mt-20">
      <SectionLayout>
        {types.map((item) => (
          <SectionCard key={item._id} to={`${item.type}`} {...item} />
        ))}
      </SectionLayout>
    </div>
  );
};

export default ProductLayout;
