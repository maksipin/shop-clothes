import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuthErrors, getIsLoggedIn, login } from "../../store/users";
import { loadFavoritesList, updateFavoritesList } from "../../store/favorite";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginError = useSelector(getAuthErrors());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfog = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
    },
  };
  useEffect(() => {
    if (data.email || data.password) validate();
  }, [data]);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("../");
      dispath(updateFavoritesList());
      dispath(loadFavoritesList());
    }
  }, [isLoggedIn]);

  const validate = () => {
    const errors = validator(data, validatorConfog);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispath(login({ payload: data }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block">
        <span className="text-amber-800">Электронная почта</span>
        <input
          type="email"
          className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          placeholder="john@example.com"
          onChange={handleChange}
          value={data.email}
          error={errors.email}
          name="email"
        />
      </label>
      <div className="text-right text-red-600 font-normal text-sm">
        {errors.email}
      </div>
      <label className="block">
        <span className="text-amber-800">Пароль</span>
        <input
          type="password"
          name="password"
          value={data.password}
          className=" mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          onChange={handleChange}
          error={errors.password}
          placeholder="Введите пароль"
        />
      </label>
      <div className="text-right text-red-600 font-normal text-sm">
        {errors.password}
      </div>
      {loginError && (
        <div className="text-right text-red-600 font-normal text-sm">
          {loginError}
        </div>
      )}
      <div className="mt-1 font-light text-sm">
        <NavLink to="./signIn">
          <span className="hover:underline hover:text-amber-800">
            Зарегистрируйтесь
          </span>
        </NavLink>
        <span> если вы еще этого не сделали</span>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="mt-4 w-full p-2 bg-amber-800 mx-auto text-white opacity-70 hover:opacity-100"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
