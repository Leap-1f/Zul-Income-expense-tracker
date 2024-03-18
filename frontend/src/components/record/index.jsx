import { useEffect, useState } from "react";
import { iconComponentMap } from "../utils/CategoryIcons";

export const Record = () => {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(10000);
  const [allCategoryData, setAllCategoryData] = useState();
  const [isLoadingFetchAllCategoryData, setIsLoadingFetchAllCategoryData] =
    useState(false);

  const fetchAllCategoryData = async () => {
    try {
      setIsLoadingFetchAllCategoryData(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/api/category`,
        {
          method: "GET",
          cache: "no-cache",
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      setAllCategoryData(res);
      setIsLoadingFetchAllCategoryData(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allCategoryData);
  useEffect(() => {
    fetchAllCategoryData();
  }, []);
  return (
    <div className=" bg-gray-100">
      <div className="h-[92vh] py-5 flex gap-5 max-w-screen-lg m-auto">
        <div className="w-[25%] bg-red-200 rounded-xl px-5 py-3 flex flex-col gap-[2%]">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Records</h1>
            <button className="w-full rounded-full bg-blue-700 h-8">
              {" "}
              + Add{" "}
            </button>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs h-8"
            />
          </div>
          <div>
            <p className="font-medium">Types</p> {" "}
            <input type="radio" id="html" name="fav_language" value="HTML" /> {" "}
            <label for="html">All</label>
            <br /> {" "}
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="CSS"
            />  <label for="css">Income</label>
            <br /> {" "}
            <input
              type="radio"
              id="javascript"
              name="fav_language"
              value="JavaScript"
            />
              <label for="javascript">Expense</label>
          </div>
          <div className="h-[80%] overflow-auto">
            <p className="font-medium">Category</p>
            <div>
              {isLoadingFetchAllCategoryData && (
                <div className="w-full h-[200px] flex justify-center items-center ">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              )}
              {!isLoadingFetchAllCategoryData && (
                <div className="mt-2">
                  {allCategoryData && allCategoryData.map((element) => {
                    if (allCategoryData.length === 0) {
                      return <div>Empty</div>;
                    } else {
                      const IconComponent =
                        iconComponentMap[element.category_image];

                      return (
                        <div
                          onClick={() => handleSelectCategory(element)}
                          key={element.id}
                          className="flex w-full pb-2 gap-3 rounded-t-md hover:bg-gray-50 active:scale-95"
                        >
                          {IconComponent && (
                            <IconComponent
                              color={element.description}
                              className="w-5 h-5"
                            />
                          )}
                          <p className="text-black">{element.name}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            {/* <button className="btn btn-ghost w-full">+ Add category</button> */}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-medium">Amount range</p>
            <div className="flex *:w-[49%] *:h-10 justify-between">
              <input
                type="text"
                placeholder="min"
                className="input input-bordered w-full max-w-xs"
                onChange={(event) => {
                  setMinRange(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="max"
                className="input input-bordered w-full max-w-xs"
                onChange={(event) => {
                  setMaxRange(event.target.value);
                }}
              />
            </div>
            <div>
              <section>
                <input
                  className="w-full"
                  type="range"
                  min={minRange}
                  max={maxRange}
                  step={10}
                  // value={volume}
                  // onChange={(event) => {
                  //   setVolume(event.target.valueAsNumber);
                  // }}
                />
                {/* <button onClick={() => setMuted(m => !m)}>
          {muted ? "muted" : "unmuted"}
        </button> */}
              </section>
              <div className="flex justify-between">
                <p>{minRange}</p>
                <p>{maxRange}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[75%] bg-green-200 rounded-xl"></div>
      </div>
    </div>
  );
};
