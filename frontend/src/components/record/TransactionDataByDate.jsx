import { iconComponentMap } from "../utils/CategoryIcons";
import moment from "moment";

export const TransactionDataByDate = ({
  transactionData,
  date,
  filterAttribute,
  allSelected,
  handleCheckboxChange,
}) => {
  const dateInfo = (el) => {
    const datePart = el.transaction_date?.split("T")[0];
    const transactionDateAndTime = moment(
      `${datePart} ${el.transaction_time}`
    ).format();
    if (date === "Today" || date === "Yesterday") {
      return moment(transactionDateAndTime).format("h:mm a");
    } else if (date === "Last week") {
      return `${moment(transactionDateAndTime).format("dddd")} ${moment(
        transactionDateAndTime
      ).format("h:mm a")}`;
    } else if (date === "Last month" || date === "Last 3 months") {
      return moment(transactionDateAndTime).format("MMMM Do, h:mm a");
    } else if (date === "Other transaction") {
      return moment(transactionDateAndTime).format("MMMM Do YYYY, h:mm a");
    }
  };
  return (
    <div>
      <p className="mb-3 font-semibold">{date}</p>
      <div className="flex flex-col gap-2">
        {transactionData &&
          transactionData.map((element) => {
            const IconComponent = iconComponentMap[element.category_image];

            return (
              <div
                key={element.id}
                className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
              >
                <div className="flex items-center ">
                  <div className="flex items-center min-w-[240px]">
                    <input
                      checked={allSelected}
                      // checked={}
                      value={element.id}
                      type="checkbox"
                      className="mr-3"
                      onChange={(event) =>
                        handleCheckboxChange(event, element.id)
                      }
                    />
                    <div
                      // onClick={() => handleSelectCategory(element)}

                      className="flex items-center w-full gap-3 rounded-t-md "
                    >
                      <div
                        style={{
                          background: `${element.category_color}`,
                        }}
                        className=" rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        {IconComponent && (
                          <IconComponent color="white" className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-black">{element.category_name}</p>
                        {/* <p className="text-xs text-gray-400">
                                      {extractHourMinute(element.transaction_time)}
                                    </p> */}
                        <p className="text-xs text-gray-400">
                          {dateInfo(element)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500">
                    {filterAttribute.search === ""
                      ? null
                      : element.description}
                  </p>
                </div>

                <p>
                  {element.transaction_type === "INC"
                    ? element.amount
                    : -element.amount}
                  ₮
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
