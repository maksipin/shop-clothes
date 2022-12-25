import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { colourStyles } from "../../utils/colourStyles";
import InputInfo from "./inputInfo";

const FeatureForm = ({ sizes, onChange, colors, index, feature, remove }) => {
  const onChangeSize = (value) => {
    onChange(index, { ...feature, size: value.label });
  };
  const onChangeColor = (value) => {
    onChange(index, {
      ...feature,
      color: { name: value.label, code: value.color },
    });
  };
  const onChangeQuantity = ({ target }) => {
    onChange(index, { ...feature, quantity: +target.value });
  };

  return (
    <div className="flex justify-center my-5 pb-5 border-b border-b-amber-800">
      <div className="w-1/4 mr-2">
        <span className="text-orange-900 text-lg">Размер</span>
        {sizes && (
          <Select
            className="mt-1"
            defaultValue={{
              value: feature.size,
              label: feature.size,
            }}
            id="size"
            closeMenuOnSelect={true}
            // components={onChange}
            onChange={onChangeSize}
            options={sizes}
          />
        )}
      </div>
      <div className="w-1/4">
        <span className="text-orange-900 text-lg">Цвет</span>
        {colors && (
          <Select
            className="mt-1 mr-2"
            closeMenuOnSelect={true}
            id="color"
            defaultValue={{
              color: feature.color.code,
              value: feature.color.name,
              label: feature.color.name,
            }}
            onChange={onChangeColor}
            options={colors}
            styles={colourStyles}
          />
        )}
      </div>
      <InputInfo
        title="Количество на складе"
        id={1}
        value={feature.quantity}
        onChange={onChangeQuantity}
      />
      <div className="my-auto text-center">
        <button
          className="ml-4 px-4 py-2  font-normal text-center align-middle text-sm bg-amber-800 text-white  shadow-md opacity-80 hover:opacity-100"
          onClick={() => remove(index)}
        >
          X
        </button>
      </div>
    </div>
  );
};
FeatureForm.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
};

export default FeatureForm;
