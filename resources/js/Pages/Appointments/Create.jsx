import React from "react";
import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    title: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("appointments.store"));
  };

  return (
    <div>
      <h1>Create Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
          />
          {errors.title && <div>{errors.title}</div>}
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData("date", e.target.value)}
          />
          {errors.date && <div>{errors.date}</div>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
