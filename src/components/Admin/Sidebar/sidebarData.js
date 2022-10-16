import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { IoBookmarkSharp, IoCartSharp } from "react-icons/io5";

export const sidebarData = [
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
        path: "/admin",
      },
      {
        id: 1.2,
        title: "Daily Capacity",
        path: "/admin/daily-capacity",
      },
    ],
  },

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
        path: "/admin/products",
      },
      {
        id: 0.2,
        title: "Add a product",
        path: "/admin/products/add",
      },
      {
        id: 0.3,
        title: "Add-ons List",
        path: "/admin/add-ons",
      },
      {
        id: 0.4,
        title: "Add an add-on",
        path: "/admin/add-ons/add",
      },
    ],
  },

  // bookings

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
        path: "/admin/rooms",
      },
      {
        id: 2.2,
        title: "Add a Room",
        path: "/admin/rooms/add",
      },
    ],
  },
];
