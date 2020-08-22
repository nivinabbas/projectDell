import React, { Component } from "react";
import Select from "react-select";
import "./style.css";

const SelectInput = ({ options, isMulti }) => (
  <Select isMulti={isMulti} options={options} className="filterSelect" />
);

export default SelectInput;
