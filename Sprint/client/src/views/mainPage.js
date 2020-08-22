import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SelectInput from "../components/Select/SelectInput";
import "./style.css";
import DatePicker from "../components/Select/datePicker";

const normalizeData = (data) => {
  return data.map((task) => {
    const { jiraId, jiraName } = task.jiraItem;
    const {
      updateTime,
      updatedFields: [{ newValue, oldValue }],
    } = task.diffItem;
    return {
      TaskId: jiraId,
      TaskName: jiraName,
      UpdateTime: `${new Date(updateTime).getDay() + 1}/${
        new Date(updateTime).getMonth() + 1
      }/${new Date(updateTime).getFullYear()}`,
      OldValue: oldValue,
      NewValue: newValue,
    };
  });
};

const MainPage = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:5000/Tickets")
      .then((res) => res.json())
      .then((res) => {
        setData(normalizeData(res));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const optionPosition = [
    { value: "oldValue", label: "Old Value" },
    { value: "newValue", label: "New Value" },
  ];
  const optionSprint = [
    { value: "Backlog", label: "Backlog" },
    { value: "inProgress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];
  return (
    <div>
      <div className="filtersContainer">
        <SelectInput options={optionPosition} />
        <SelectInput options={optionSprint} isMulti={true} />
        <DatePicker />
      </div>
      {data && data.length > 0 && <Table data={data} />}
    </div>
  );
};

export default MainPage;
