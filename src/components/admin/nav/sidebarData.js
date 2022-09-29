import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoBookmarkSharp, IoCartSharp } from "react-icons/io5";

export const sidebarData = [
  // products
  {
    id: 0,
    title: "Product",
    icon: <IoCartSharp size={22} />,
    iconOpened: <MdKeyboardArrowUp size={25} />,
    iconClosed: <MdKeyboardArrowDown size={25} />,
    subNav: [
      {
        id: 0.1,
        title: "All Products",
        path: "/all-products",
      },
      {
        id: 0.2,
        title: "Add Products",
        path: "/add-products",
      },
      {
        id: 0.3,
        title: "All Add Ons",
        path: "/all-add-ons",
      },
      {
        id: 0.4,
        title: "Add Ons",
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
        title: "All Bookings",
        path: "/all-bookings",
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
        title: "All Rooms",
        path: "/all-rooms",
      },
      {
        id: 2.2,
        title: "Add Rooms",
        path: "/add-rooms",
      },
    ],
  },
];
