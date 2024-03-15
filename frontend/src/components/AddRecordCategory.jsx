import { AddCategoryIcon } from "./utils/CategoryIcons";
import { iconComponentMap } from "./utils/CategoryIcons";

export const AddRecordCategory = ({
  setShowAddCategory,
  categoryData,
  setSelectedCategoryInfo,
  setSelectedCategory,
  setCategoryBox,
  newCategoryInfo,
  isLoadingFetchAllCategoryData,
}) => {
  const handleAddCategory = () => {
    setShowAddCategory(true);
    console.log(newCategoryInfo, "addrecordCAtegory, newCategoryInfo");
  };
  const handleSelectCategory = (element) => {
    console.log(element.name);
    setSelectedCategoryInfo({
      name: element.name,
      color: element.description,
      image: element.category_image,
    });
    setSelectedCategory(true);
    setCategoryBox(false);
  };
  let empty = "";
  if (isLoadingFetchAllCategoryData) {
    empty = "";
  } else if (categoryData.length === 0) {
    empty = "Empty";
  }
  return (
    <div className="w-full h-[300px] bg-white absolute top-[80px] rounded-md shadow-lg overflow-auto">
      <label
        onClick={handleAddCategory}
        className="flex w-full p-3 gap-3 border-b rounded-t-md hover:bg-gray-50 active:scale-95"
      >
        <AddCategoryIcon />
        <p>Add Category</p>
      </label>
      <div className="overflow-auto p-3 text-gray-200">
        {empty}
        {isLoadingFetchAllCategoryData && (
          <div className="w-full h-[200px] flex justify-center items-center ">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {!isLoadingFetchAllCategoryData && (
          <div>
            {categoryData.map((element) => {
              if (categoryData.length === 0) {
                return <div>Empty</div>;
              } else {
                const IconComponent = iconComponentMap[element.category_image];

                return (
                  <div
                    onClick={() => handleSelectCategory(element)}
                    key={element.id}
                    className="flex w-full pb-6 gap-3 rounded-t-md hover:bg-gray-50 active:scale-95"
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
    </div>
  );
};
