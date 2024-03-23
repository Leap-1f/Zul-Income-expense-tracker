import { iconComponentMap } from "../utils/CategoryIcons";

export const TransactionDataByDate = ({transactionData, date}) => {
     const extractHourMinute = (dateString) => {
          const dateObj = new Date(dateString);
          const hour = dateObj.getHours();
          const minute = dateObj.getMinutes();
          return `${hour}:${minute}`;
        };
     return (
          <div>
                    <p className="mb-3 font-semibold">{date}</p>
                    <div className="flex flex-col gap-2">
                      {transactionData &&
                        transactionData.map((element) => {
                          const IconComponent =
                            iconComponentMap[element.category_image];
                          return (
                            <div
                              key={element.id}
                              className="w-full flex justify-between items-center rounded-xl h-12 bg-white px-4"
                            >
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-3" />
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
                                      <IconComponent
                                        color="white"
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-black">
                                      {element.category_name}
                                    </p>
                                    {/* <p className="text-xs text-gray-400">
                                      {extractHourMinute(element.transaction_time)}
                                    </p> */}
                                    <p className="text-xs text-gray-400">
                                      {element.transaction_time}
                                    </p>
                                  </div>
                                </div>
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
     )
}