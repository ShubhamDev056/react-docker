import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";

const Adduuid = () => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Jal Jevan Mission Add New UUID</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
          <div className="form-group">
            <label htmlFor="email">UUID:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="uuid"
              {...register("uuid", {
                required: true,
              })}
              placeholder="Enter your UUID Number"
            />
            {errors.uuid && errors.uuid.type === "required" && (
              <p className="errorMsg" style={{color:'red'}}>UUID Number is required.</p>
            )}
          </div>

          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Adduuid;
