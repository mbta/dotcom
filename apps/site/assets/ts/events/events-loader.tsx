import React from "react";
import { render } from "react-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const eventsLoader = (): void => {
  const calendarEl = document.getElementById("react-events-root");

  const eventsDataEl = document.getElementById("js-teasers-data");
  const teasers = eventsDataEl ? JSON.parse(eventsDataEl.innerText) : {};
  const events = Object.prototype.hasOwnProperty.call(teasers, "teasers")
    ? teasers.teasers
    : [];

  const eventsToDisplay = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    end: event.date_end,
    url: event.path
  }));

  render(
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      fixedWeekCount={false}
      showNonCurrentDates={false}
      dayHeaderFormat={{ weekday: "long" }}
      dayHeaderClassNames="month-header"
      headerToolbar={{
        start: "title",
        center: "",
        end: ""
      }}
      events={eventsToDisplay}
    />,
    calendarEl
  );
};

export default eventsLoader;
