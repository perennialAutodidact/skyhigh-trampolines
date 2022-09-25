import { useContext } from "react";
import { ProductSelectContext } from "../context";
import { setSelectedStartTime } from "../context/actions";

import styles from "../RoomAccordion/RoomAccordion.module.scss";

const StartTimeList = ({ room }) => {
  const [state, dispatch] = useContext(ProductSelectContext);
  const { startTimes } = state;
  const { selectedStartTime, disabledStartTimes, id: roomId } = room;

  const isDisabled = (time) => disabledStartTimes.includes(time);

  const changeSelectedStartTime = (time) => {
    if (!isDisabled(time)) {
      dispatch(setSelectedStartTime(roomId, time));
    }
  };

  return (
    <>
      <div className="text-center pt-3">Start time</div>
      <div className="row gy-1 px-5">
        {startTimes.map((time) => (
          <div className="col-3 col-lg-2 p-1" key={`${roomId}-${time}`}>
            <div
              className={`
                py-1 border text-center
                ${time === selectedStartTime ? "bg-info" : ""}
                ${
                  isDisabled(time)
                    ? styles.startTimeButton__disabled
                    : styles.startTimeButton
                }
                `}
              onClick={() => changeSelectedStartTime(time)}
            >
              {time}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StartTimeList;
