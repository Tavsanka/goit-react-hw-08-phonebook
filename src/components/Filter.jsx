import React from "react";
import PropTypes from "prop-types";
import "./Filter.scss";

const Filter = ({ value, onChange }) => (
  <div className={"contact"}>
    <label htmlFor="filter">Find contacts by name</label>
    <input
      type="text"
      id="filter"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
