import React from "react";
import {useSelector} from "react-redux";
import {getUrl} from "../store/users";
const Post = () => {
  const url = useSelector(getUrl())
  return (
    <div>
      <div className="sm:px-8 my-16 sm:mt-32">
        <div className="mx-auto  lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto ">
              <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                  <div className="max-w-xs px-2.5 lg:max-w-none">
                    <img
                      alt=""
                      sizes="(min-width: 1024px) 32rem, 20rem"
                      src={
                        url +
                        "1c343fc7-9b16-486a-85b6-a67bf1338101.jpg"
                      }
                      width="800"
                      height="800"
                      decoding="async"
                      data-nimg="1"
                      className="aspect-square rotate-3 shadow-lg rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                      loading="lazy"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                  <h1 className="text-4xl font-light tracking-tight text-amber-900 first:sm:text-5xl">
                    Наша коллекция создана для мниатюрных творцов. <br /> Мы
                    поможем найти тебе свой образ
                  </h1>
                  <div className="mt-6 space-y-7 text-base text-amber-900 opacity-80">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum odio fuga quibusdam quas sequi fugit dolorum.
                      Voluptatum recusandae corporis laborum quos a totam
                      nesciunt vel tempora nam quas, adipisci atque?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum odio fuga quibusdam quas sequi fugit dolorum.
                      Voluptatum recusandae corporis laborum quos a totam
                      nesciunt vel tempora nam quas, adipisci atque? Lorem ipsum
                      dolor sit amet consectetur adipisicing elit. Cum odio fuga
                      quibusdam quas sequi fugit dolorum. Voluptatum recusandae
                      corporis laborum quos a totam nesciunt vel tempora nam
                      quas, adipisci atque?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum odio fuga quibusdam quas sequi fugit dolorum.
                      Voluptatum recusandae corporis laborum quos a totam
                      nesciunt vel tempora nam quas, adipisci atque?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cum odio fuga quibusdam quas sequi fugit dolorum.
                      Voluptatum recusandae corporis laborum quos a totam
                      nesciunt vel tempora nam quas, adipisci atque?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
