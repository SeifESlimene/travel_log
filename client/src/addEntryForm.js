import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      data.Latitude = location.latitude;
      data.Longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      setError(error.message);
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {Error ? <h3 class="error">{Error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" id="title" ref={register({ required: true })} />
      {errors.title && <span>This field is required</span>}
      <label htmlFor="Comments">Comments</label>
      <textarea
        name="Comments"
        id="Comments"
        rows="3"
        ref={register}
      ></textarea>
      <label htmlFor="Description">Description</label>
      <textarea
        name="Description"
        id="Description"
        rows="3"
        ref={register}
      ></textarea>
      <label htmlFor="Image">Image</label>
      <input id="Image" name="Image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input
        name="visitDate"
        type="date"
        id="visitDate"
        ref={register({ required: true })}
      />
      {errors.visitDate && <span>This field is required</span>}
      <button disabled={Loading}>
        {Loading ? "Loading..." : "Create Log Entry"}
      </button>
    </form>
  );
};

export default LogEntryForm;
