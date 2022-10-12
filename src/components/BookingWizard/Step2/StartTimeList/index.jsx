import { useContext } from "react";
import { BookingWizardContext } from "../../context";
import { setSelectedStartTime } from "../../context/actions";

import styles from "./StartTimeList.module.scss";

const StartTimeList = ({ room }) => {
  const [state, dispatch] = useContext(BookingWizardContext);
  const { startTimes } = state;
  const { selectedStartTime, disabledStartTimes, id: roomId } = room;

  const isDisabled = (time) => disabledStartTimes.includes(time);

  const changeSelectedStartTime = (time) => {
    if (!isDisabled(time)) {
      const newTime = selectedStartTime !== time ? time : "";
      dispatch(setSelectedStartTime(roomId, newTime));
    }
  };

  const isAtLeastAnHourBeforeClose = (time) => startTimes.indexOf(time) < startTimes.length - 2

  return (
    <>
      <div className="text-center pt-3">Start time</div>
      <div className="row gy-1 px-3 px-lg-5">
        {startTimes.map(
          (time, index) =>
             isAtLeastAnHourBeforeClose(time) && (
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
            )
        )}
      </div>
    </>
  );
};

export default StartTimeList;
