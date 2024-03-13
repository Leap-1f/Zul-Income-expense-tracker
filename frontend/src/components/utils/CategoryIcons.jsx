import { IoMdHome, IoIosGift } from "react-icons/io";
import {
  MdFastfood,
  MdHealthAndSafety,
  MdOfflineBolt,
  MdNearMe,
  MdKitesurfing,
  MdSavings,
  MdChildFriendly,
  MdIcecream,
  MdFamilyRestroom,
  MdFitnessCenter,
} from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { FaTaxi, FaShoppingCart } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import { GiOpenBook } from "react-icons/gi";
import { AiOutlineFileProtect } from "react-icons/ai";
import {
  ImDroplet,
  ImEarth,
  ImFire,
  ImAttachment,
  ImClubs,
  ImHammer,
  ImHourGlass,
  ImManWoman,
  ImMusic,
  ImPhone,
  ImStarFull,
  ImHeart,
} from "react-icons/im";
let iconColor = "gray";
// export const categoryIcons = [
//   { name: "home", component: IoMdHome, props: { className: `w-5 h-5` } },
//   { name: "gift", component: IoIosGift, props: { className: `w-5 h-5` } },
//   { name: "food", component: MdFastfood, props: { className: `w-5 h-5` } },
//   { name: "drink", component: BiSolidDrink, props: { className: `w-5 h-5` }  },
//   { name: "taxi", component: FaTaxi, props: { className: `w-5 h-5` } },
//   { name: "shopping", component: FaShoppingCart, props: { className: `w-5 h-5` } },
//   { name: "travel", component: ImAirplane, props: { className: `w-5 h-5` } },
//   { name: "study", component: GiOpenBook, props: { className: `w-5 h-5` } },
//   { name: "health", component: MdHealthAndSafety, props: { className: `w-5 h-5` } },
//   { name: "saving", component: MdSavings, props: { className: `w-5 h-5` } },
//   { name: "fitness", component: MdFitnessCenter, props: { className: `w-5 h-5` } },
//   { name: "family", component: MdFamilyRestroom, props: { className: `w-5 h-5` } },
//   { name: "insuranse", component: AiOutlineFileProtect, props: { className: `w-5 h-5` } },
//   { name: "", component: ImDroplet, props: { className: `w-5 h-5` } },
//   { name: "", component: ImEarth, props: { className: `w-5 h-5` } },
//   { name: "", component: ImFire, props: { className: `w-5 h-5` } },
//   { name: "", component: ImAttachment, props: { className: `w-5 h-5` } },
//   { name: "", component: ImClubs, props: { className: `w-5 h-5` } },
//   { name: "", component: ImHammer, props: { className: `w-5 h-5` } },
//   { name: "", component: ImHourGlass, props: { className: `w-5 h-5` } },
//   { name: "", component: ImManWoman, props: { className: `w-5 h-5` } },
//   { name: "", component: ImMusic, props: { className: `w-5 h-5` } },
//   { name: "", component: ImPhone, props: { className: `w-5 h-5` } },
//   { name: "", component: ImStarFull, props: { className: `w-5 h-5` } },
//   { name: "", component: ImHeart, props: { className: `w-5 h-5` } },
//   { name: "", component: MdOfflineBolt, props: { className: `w-5 h-5` } },
//   { name: "", component: MdNearMe, props: { className: `w-5 h-5` } },
//   { name: "", component: MdKitesurfing, props: { className: `w-5 h-5` } },
//   { name: "", component: MdIcecream, props: { className: `w-5 h-5` } },
//   { name: "", component: MdChildFriendly, props: { className: `w-5 h-5` } },
// ];
export const categoryIcons = [
  IoMdHome,
  IoIosGift,
  MdFastfood,
  BiSolidDrink,
  FaTaxi,
  FaShoppingCart,
  ImAirplane,
  GiOpenBook,
  MdHealthAndSafety,
  MdSavings,
  MdFitnessCenter,
  MdFamilyRestroom,
  AiOutlineFileProtect,
  ImDroplet,
  ImEarth,
  ImFire,
  ImAttachment,
  ImClubs,
  ImHammer,
  ImHourGlass,
  ImManWoman,
  ImMusic,
  ImPhone,
  ImStarFull,
  ImHeart,
  MdOfflineBolt,
  MdNearMe,
  MdKitesurfing,
  MdIcecream,
  MdChildFriendly,
];

export const Home = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 10.8329V19.5001C21 19.8979 20.842 20.2795 20.5607 20.5608C20.2794 20.8421 19.8978 21.0001 19.5 21.0001H15.75C15.3522 21.0001 14.9706 20.8421 14.6893 20.5608C14.408 20.2795 14.25 19.8979 14.25 19.5001V15.7501C14.25 15.5512 14.171 15.3604 14.0303 15.2198C13.8897 15.0791 13.6989 15.0001 13.5 15.0001H10.5C10.3011 15.0001 10.1103 15.0791 9.96967 15.2198C9.82902 15.3604 9.75 15.5512 9.75 15.7501V19.5001C9.75 19.8979 9.59196 20.2795 9.31066 20.5608C9.02936 20.8421 8.64782 21.0001 8.25 21.0001H4.5C4.10218 21.0001 3.72064 20.8421 3.43934 20.5608C3.15804 20.2795 3 19.8979 3 19.5001V10.8329C2.99997 10.6253 3.04303 10.42 3.12646 10.2299C3.20989 10.0398 3.33187 9.86907 3.48469 9.72855L10.9847 2.6523L10.995 2.64199C11.2711 2.39086 11.631 2.25171 12.0042 2.25171C12.3775 2.25171 12.7373 2.39086 13.0134 2.64199C13.0166 2.64566 13.0201 2.6491 13.0238 2.6523L20.5238 9.72855C20.675 9.86981 20.7954 10.0409 20.8774 10.2309C20.9594 10.421 21.0011 10.6259 21 10.8329Z"
        fill="#343330"
      />
    </svg>
  );
};
export const AddCategoryIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7468 9.41513 20.7185 6.93705 18.8907 5.10927C17.063 3.28149 14.5849 2.25323 12 2.25ZM15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86033 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86033 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z"
        fill="#0166FF"
      />
    </svg>
  );
};
export const ArrowDropDown = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z"
        fill="#1F2937"
      />
    </svg>
  );
};
