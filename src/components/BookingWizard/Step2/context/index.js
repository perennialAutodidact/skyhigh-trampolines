import { createContext } from "react";
import { getHalfHourIncrementStrings } from "./utils";

export const initialState = {
  rooms: [
    // populate once room data is loaded
    // {
    //   id: 283748937,
    //   products: [
    //     {
    //       id: 9989898,
    //       name: 'Product 1',
    //       quantity: 0
    //     }
    //   ],
    //   selectedStartTime: "",
    //   disabledStartTimes: ["9:00", "9:30", "16:00"]
    // }
  ],
  startTimes: getHalfHourIncrementStrings("9:00", "16:30")  
}

export const ProductSelectContext = createContext(initialState)