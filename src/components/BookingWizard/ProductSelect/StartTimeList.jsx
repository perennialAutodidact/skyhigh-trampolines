import React from "react";
import { getHalfHourIncrementStrings } from "./utils";

const StartTimeList = () => {
  const START_TIMES = getHalfHourIncrementStrings("9:00", "16:30");
  return (
    <>
      <div className="text-center pt-3">Start time</div>
      <div className="row gy-1 px-5">
        {START_TIMES.map((time) => (
          <div className="col-3 col-lg-2 p-1">
            <div className="py-1 border text-center">{time}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StartTimeList;
