export const sortBookingsByRoom = (bookings, allRooms) => {
  let bookingsByRoom = {};

  for (let room of allRooms) {
    bookingsByRoom[room.id] = {
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      bookings: [],
    };
  }

  for (let booking of bookings) {
    for (let bookedRoom of booking.rooms) {
      bookingsByRoom[bookedRoom.id].bookings = bookingsByRoom[
        bookedRoom.id
      ].bookings.concat({
        startTime: bookedRoom.startTime,
        products: bookedRoom.products,
      });
    }
  }

  return Object.keys(bookingsByRoom).map((roomId) => bookingsByRoom[roomId]);
};

export const ticketNameToTimeSlots = (ticketName, totalTimeSlots) => {
  const timeSlotsByTicketName = {
    "60min": 2,
    "90min": 3,
    "120min": 4,
    allDay: totalTimeSlots,
  };

  return timeSlotsByTicketName[ticketName];
};

export const getRoomAvailabilities = (room, times) => {
  const { bookings, capacity } = room;

  let ticketCounts = times.map((time) => capacity);
  let bookingIndex, startIndex, endIndex, booking, timeIndex;
  // console.log(room);

  bookingIndex = 0;
  while (bookingIndex < bookings.length) {
    booking = bookings[bookingIndex];
    timeIndex = times.indexOf(booking.startTime);
    for (let ticket of booking.products) {
      let timeSlots = ticketNameToTimeSlots(ticket.duration, times.length);
      startIndex = timeIndex;
      endIndex = timeIndex + timeSlots;
      while (startIndex < endIndex) {
        ticketCounts[startIndex] -= ticket.quantity;
        startIndex++;
      }
    }
    bookingIndex++;
  }

  let allAvailableTickets = {};
  let ticketsAvailableAtCurrentTime = {};
  let currentTime, currentTicketCount, futureTimeIndex;
  let ticketNames = ["60min", "90min", "120min", "allDay"];

  let i = 0;
  while (i < ticketCounts.length - 2) {
    ticketsAvailableAtCurrentTime = {};
    currentTime = times[i];
    currentTicketCount = ticketCounts[i];

    let j = 0;
    while (j < ticketNames.length) {
      futureTimeIndex = i + j + 1;
      let isValidTimeIndex = futureTimeIndex < times.length - 1;

      if (!isValidTimeIndex) {
        j++;
        continue;
      }

      let ticketName = ticketNames[j];

      ticketsAvailableAtCurrentTime[ticketName] = currentTicketCount;
      j++;
    }

    allAvailableTickets = {
      ...allAvailableTickets,
      [currentTime]: ticketsAvailableAtCurrentTime,
    };
    i++;
  }
  return allAvailableTickets;
};
