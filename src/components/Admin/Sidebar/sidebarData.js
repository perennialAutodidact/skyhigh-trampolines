import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoBookmarkSharp, IoCartSharp } from "react-icons/io5";

export const sidebarData = [
  // products
  {
    id: 0,
    title: "Products",
    icon: <IoCartSharp size={22} />,
    iconOpened: <MdKeyboardArrowUp size={25} />,
    iconClosed: <MdKeyboardArrowDown size={25} />,
    subNav: [
      {
        id: 0.1,
        title: "Products List",
        path: "/products",
      },
      {
        id: 0.2,
        title: "Add a product",
        path: "/products/add",
      },
      {
        id: 0.3,
        title: "Add-ons List",
        path: "/add-ons/add",
      },
      {
        id: 0.4,
        title: "Add an add-on",
        path: "/add-ons",
      },
    ],
  },

  // bookings

  {
    id: 1,
    title: "Bookings",
    icon: <IoBookmarkSharp size={20} />,
    iconOpened: <MdKeyboardArrowUp size={25} />,
    iconClosed: <MdKeyboardArrowDown size={25} />,
    subNav: [
      {
        id: 1.1,
        title: "Bookings List",
        path: "/bookings",
      },
      {
        id: 1.2,
        title: "Daily Capacity",
        path: "/daily-capacity",
      },
    ],
  },

  //   rooms

  {
    id: 2,
    title: "Rooms",
    icon: <AiFillHome size={20} />,
    iconOpened: <MdKeyboardArrowUp size={25} />,
    iconClosed: <MdKeyboardArrowDown size={25} />,
    subNav: [
      {
        id: 2.1,
        title: "Rooms List",
        path: "/rooms",
      },
      {
        id: 2.2,
        title: "Add a Room",
        path: "/rooms/add",
      },
    ],
  },
];
