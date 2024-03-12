import React, { useContext } from "react";
import { Context } from "./utils/context";
import { AddRecord } from "./AddRecordModal";
import { ArrowDropDown, Home } from "./utils/CategoryImg";

export const AddCategoryModal = () => {
  const { setShowAddCategory } = useContext(Context);
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-1">
      <div className="relative w-full h-[100vh] flex items-center justify-center">
        <div
          onClick={() => {
            setShowAddCategory(false);
          }}
          className="absolute top-0 left-0 w-full h-[100vh] bg-gray-900 opacity-25 z-2"
        ></div>
        <div className="w-[500px] h-[240px] p-5 rounded-xl bg-white absolute top-center left-center z-3 flex flex-col justify-between">
          <div className="flex justify-between items-start border-b pb-3">
            <h3 className="font-bold text-lg ">Add category</h3>
            <div className="modal-action m-0">
              {/* <label
            htmlFor="my_modal_6"
            className="btn btn-sm btn-circle btn-ghost "
          >
            ✕
          </label> */}
              <label 
                htmlFor="my_modal_6"
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </label>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <AddRecord></AddRecord>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-12 w-[20%] rounded-md border border-gray-300 bg-gray-50 flex justify-end gap-3 items-center active:scale-95">
              <Home />
              <ArrowDropDown />
            </div>
            {/* <div className="h-12 w-[78%] rounded-md border border-gray-300 bg-gray-50 flex justify-start pl-3 items-center">
              Name
            </div>
            <input type="text" placeholder="Icon" className="input input-bordered w-full max-w-xs" /> */}
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-[78%]"
            />
          </div>
          <button className="btn w-full text-white rounded-full bg-green-600">
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
