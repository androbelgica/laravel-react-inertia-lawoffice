import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { router } from "@inertiajs/react";

const Scheduler = ({ lawsuit_tasks = [], other_legal_service_tasks = [] }) => {
  const calendarRef = useRef(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const events = [
    ...lawsuit_tasks.data.map((task) => ({
      id: task.id,
      title: task.task_name,
      start: task.created_at,
      end: task.due_date,
      allDay: true,
      color: getRandomColor(),
      extendedProps: {
        remarks: task.description,
        status: task.status,
        type: "lawsuit",
      },
    })),
    ...other_legal_service_tasks.data.map((task) => ({
      id: task.id,
      title: task.task_name,
      start: task.created_at,
      end: task.due_date,
      allDay: true,
      color: getRandomColor(),
      extendedProps: {
        remarks: task.description,
        status: task.status,
        type: "other_legal_service",
      },
    })),
  ];

  const handleEventClick = (info) => {
    const { id, extendedProps } = info.event;
    const { type } = extendedProps;

    if (type === "lawsuit") {
      router.get(route("lawsuit-tasks.edit", id));
    } else if (type === "other_legal_service") {
      router.get(route("other-legal-service-tasks.edit", id));
    }
  };

  return (
    <div id="calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={false}
        editable={false}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Scheduler;
