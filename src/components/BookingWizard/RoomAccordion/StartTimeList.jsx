import styles from "../RoomAccordion/RoomAccordion.module.scss";

const StartTimeList = ({
  startTimes,
  selectedStartTime,
  disabledStartTimes,
}) => {
  return (
    <>
      <div className="text-center pt-3">Start time</div>
      <div className="row gy-1 px-5">
        {startTimes.map((time) => (
          <div className="col-3 col-lg-2 p-1" key={time}>
            <div
              className={`
                py-1 border text-center
                ${time === selectedStartTime ? "bg-info" : ""}
                ${disabledStartTimes.includes(time) ? styles.disabledTime : ""}
                `}
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
