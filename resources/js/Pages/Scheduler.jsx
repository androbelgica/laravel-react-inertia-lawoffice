import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { router } from "@inertiajs/react";

const SchedulerPage = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const lawsuitTasksResponse = await router.get(
          route("scheduler.fetchLawsuitTasks")
        );
        const otherLegalServiceTasksResponse = await router.get(
          route("scheduler.fetchOtherLegalServiceTasks")
        );

        const lawsuitTasks = lawsuitTasksResponse.data.map((task) => ({
          id: task.id,
          date: new Date(task.due_date),
          title: task.task_name,
          bgColor: "purple",
        }));

        const otherLegalServiceTasks = otherLegalServiceTasksResponse.data.map(
          (task) => ({
            id: task.id,
            date: new Date(task.due_date),
            title: task.task_name,
            bgColor: "blue",
          })
        );

        setEvents([...lawsuitTasks, ...otherLegalServiceTasks]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );
      return dayEvents.map((event) => (
        <div
          key={event.id}
          style={{
            backgroundColor: event.bgColor,
            color: "white",
            padding: "2px",
            borderRadius: "4px",
          }}
        >
          {event.title}
        </div>
      ));
    }
  };

  return (
    <div>
      <Calendar onChange={setDate} value={date} tileContent={tileContent} />
    </div>
  );
};

export default SchedulerPage;
