import React from "react";
import PropTypes from "prop-types";

import "./card.css";

const Card = (props) => {
  const [info, setInfo] = React.useState("");
  const [title, setTitle] = React.useState(props.id.title);
  const [isTicked, setIsTicked] = React.useState(props.id.isTicked);
  const [toEdit, setToEdit] = React.useState(false);

  return (
    <div className="card">
      <div className="hover:cursor-pointer" style={{ marginRight: "21px" }}>
        <svg
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 12.5H18V10.5H0V12.5ZM0 7.5H18V5.5H0V7.5ZM0 0.5V2.5H18V0.5H0Z"
            fill="black"
          />
        </svg>
      </div>
      <div
        className="hover:cursor-pointer"
        style={{ marginRight: "18px" }}
        onClick={() => {
          setInfo(`A brief description of ${title}`);
          setTimeout(() => {
            setInfo("");
          }, 3000);
        }}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5.5H11V7.5H9V5.5ZM9 9.5H11V15.5H9V9.5ZM10 0.5C4.48 0.5 0 4.98 0 10.5C0 16.02 4.48 20.5 10 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 10 0.5ZM10 18.5C5.59 18.5 2 14.91 2 10.5C2 6.09 5.59 2.5 10 2.5C14.41 2.5 18 6.09 18 10.5C18 14.91 14.41 18.5 10 18.5Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="card__title">
        {toEdit ? (
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            defaultValue={title}
            disabled={!toEdit}
            style={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "500",
              border: "solid black 1px",
            }}
          />
        ) : (
          <p>{title}</p>
        )}
        <p style={{ fontSize: "14px", fontWeight: "100", color: "grey" }}>
          {info}
        </p>
      </div>
      {toEdit ? (
        <div className="relative inline-flex items-center cursor-pointer ml-4 mr-4">
          <button
            onClick={() => {
              setTitle(title);
              setToEdit(!toEdit);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className="relative inline-flex items-center cursor-pointer ml-4 mr-4"
          onClick={() => {
            setToEdit(!toEdit);
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00208 5.32708L9.67292 5.99792L3.06667 12.6042H2.39583V11.9333L9.00208 5.32708ZM11.6271 0.9375C11.4448 0.9375 11.2552 1.01042 11.1167 1.14896L9.78229 2.48333L12.5167 5.21771L13.851 3.88333C14.1354 3.59896 14.1354 3.13958 13.851 2.85521L12.1448 1.14896C11.999 1.00312 11.8167 0.9375 11.6271 0.9375ZM9.00208 3.26354L0.9375 11.3281V14.0625H3.67187L11.7365 5.99792L9.00208 3.26354Z"
              fill="black"
            />
          </svg>
        </div>
      )}
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={isTicked}
          onChange={() => {
            setIsTicked(!isTicked);
          }}
          className="sr-only peer"
        />
        <div
          className={`checkBoxPeer w-11 h-6 bg-light-gray peer-focus:outline-none  rounded-full peer dark:bg-light-gray peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] ${
            !isTicked ? "after:bg-mid-gray" : "after:bg-toggle-dark"
          }  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toggle`}
        ></div>
      </label>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object,
};

export default Card;
