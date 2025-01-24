import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { router } from "@inertiajs/react";

const SchedulerPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const lawsuitTasksResponse = await router.get(
          route("scheduler.fetchLawsuitTasks")
        );
        const otherLegalServiceTasksResponse = await router.get(
          route("scheduler.fetchOtherLegalServiceTasks")
        );

        const lawsuitTasks = lawsuitTasksResponse.props.tasks.map((task) => ({
          id: task.id,
          title: `${task.task_name} (Assigned to: ${task.user_name})`,
          start: task.created_at,
          end: task.due_date,
          backgroundColor: "purple",
        }));

        const otherLegalServiceTasks = otherLegalServiceTasksResponse.props.tasks.map(
          (task) => ({
            id: task.id,
            title: `${task.task_name} (Assigned to: ${task.user_name})`,
            start: task.created_at,
            end: task.due_date,
            backgroundColor: "blue",
          })
        );

        setEvents([...lawsuitTasks, ...otherLegalServiceTasks]);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default SchedulerPage;
