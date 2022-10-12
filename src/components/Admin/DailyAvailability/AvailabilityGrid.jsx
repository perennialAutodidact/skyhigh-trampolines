import React, { useState, useMemo } from "react";
import { getHalfHourIncrementStrings } from "../../BookingWizard/context/utils";
import { getRoomAvailabilities } from "../../../utils";
import { useCallback } from "react";
import { useEffect } from "react";

const AvailabilityGrid = ({ room }) => {
  const times = getHalfHourIncrementStrings("9:00", "16:30");
  const ticketTypes = ["60 min", "90 min", "120 min", "All Day"];
  const ticketNames = ["60min", "90min", "120min", "allDay"];
  //   console.log(room);

  const roomAvailabilities = getRoomAvailabilities(room, times);

  const isValidTime = useCallback(
    (time, ticketName) =>
      !!(
        roomAvailabilities[time] &&
        roomAvailabilities[time][ticketName] !== undefined
      ),
    [roomAvailabilities]
  );

  const getTicketCount = useCallback(
    (time, ticketName) => roomAvailabilities[time][ticketName],
    [roomAvailabilities]
  );

  const getBgColor = (ticketCount, capacity) => {
    let percent = (ticketCount / capacity) * 100;
    return percent > 50 ? "green" : percent > 0 ? "yellow" : "red";
  };

  return (
    <div className="container shadow p-0 border mb-5">
      <table className="table m-0">
        <thead>
          <tr className="fw-bold">
            <td className="text-center border-end">Time</td>
            <td colSpan="4" className="text-center">Ticket Durations</td>
          </tr>
          <tr>
            <td className="bg-light border-end"></td>
            {ticketTypes.map((ticketType) => (
              <td className="text-center">{ticketType}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr>
              <td className="text-center">{time}</td>
              {ticketNames.map((ticketName) =>
                isValidTime(time, ticketName) ? (
                  <td
                    className={`text-center bg-${getBgColor(
                      getTicketCount(time, ticketName),
                      room.capacity
                    )}`}
                  >
                    {getTicketCount(time, ticketName).toString()}
                  </td>
                ) : (
                  <td className="text-center bg-light">-</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityGrid;
