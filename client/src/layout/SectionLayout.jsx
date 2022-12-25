import React, { useState, useEffect } from "react";
import SectionCard from "../components/SectionCard";
import typeService from "../services/type.service";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, getTypesLoadingStatus, loadTypeList } from "../store/type";

const SectionLayout = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getTypesLoadingStatus());
  const types = useSelector(getTypes());
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (!isLoading) setSections(types);
  }, [isLoading]);

  return (
    <div className="m-auto flex justify-center flex-wrap  max-w-screen-2xl">
      {isLoading
        ? "Loading"
        : sections.map((item) => (
            <SectionCard
              key={item._id}
              to={`products/${item.type}`}
              {...item}
            />
          ))}
    </div>
  );
};

export default SectionLayout;
