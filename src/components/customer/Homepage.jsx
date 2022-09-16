import React from "react";
import styled from "./Homepage.module.scss";

const Homepage = () => {
  return (
    <section className={styled.homepage}>
      <figure className="h-100 w-100">
        <img
          className="img-fluid h-100 w-100"
          src="https://images.unsplash.com/photo-1612985838143-47ffc9b76532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80"
          alt="Women jumping in trampoline"
        />
      </figure>

      <div
        className={`${styled.overlay} position-absolute d-flex justify-content-center align-items-center w-100  bg-overlay bg-opacity-50`}
      >
        <button type="button" className="btn btn-light btn-lg rounded-0  ">
          Buy Tickets
        </button>
      </div>
    </section>
  );
};

export default Homepage;
