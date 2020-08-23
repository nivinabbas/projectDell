import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SelectInput from "../components/Select/SelectInput";
import "./style.css";
import DatePicker from "../components/Select/datePicker";
import StackedChart from "../components/Charts/StackedChart";

const normalizeData = (data) => {
  return data.map((task) => {
    if (!task.jiraItem) return {};
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

const normalizeFilteredData = (filteredData, { oldnewvalue }) => {
  const data = filteredData.map((data) => {
    return data.tasks.map((task) => {
      if (!task.jiraItem) return {};
      const { jiraId, jiraName } = task.jiraItem;
      const {
        updateTime,
        updatedFields: [{ newValue, oldValue }],
      } = task.diffItem;
      let value;
      if (oldnewvalue === "oldValue") value = oldValue;
      else {
        value = newValue;
      }
      console.log({
        TaskId: jiraId,
        TaskName: jiraName,
        UpdateTime: `${new Date(updateTime).getDay() + 1}/${
          new Date(updateTime).getMonth() + 1
        }/${new Date(updateTime).getFullYear()}`,
        Value: value,
      });
      return {
        TaskId: jiraId,
        TaskName: jiraName,
        UpdateTime: `${new Date(updateTime).getDay() + 1}/${
          new Date(updateTime).getMonth() + 1
        }/${new Date(updateTime).getFullYear()}`,
        Value: value,
      };
    });
  });
  return data.flat(2);
};
//oldnewvalue, statusField, startdateToSend, enddateToSend
const MainPage = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    oldnewvalue: "oldValue",
    statusField: "Backlog",
  });

  const fetchData = () => {
    fetch("http://localhost:5000/Tickets")
      .then((res) => res.json())
      .then((res) => {
        console.log(normalizeData(res));

        setData(normalizeData(res));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFilterChange = (data) => {
    console.log({ ...filters, ...data });
    return setFilters((f) => {
      return { ...f, ...data };
    });
  };

  const fetchFilteredData = () => {
    console.log("fetch");
    fetch("http://localhost:5000/getUpdatedByStatus", {
      method: "POST",
      body: JSON.stringify({ ...filters }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(normalizeFilteredData(res, filters));
        setData(normalizeFilteredData(res, filters));
      });
  };

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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div className="filtersContainer">
            <SelectInput
              options={optionPosition}
              dataKey="oldnewvalue"
              onSelect={onFilterChange}
            />
            <SelectInput
              options={optionSprint}
              dataKey="statusField"
              onSelect={onFilterChange}
              isMulti={true}
            />
            <DatePicker onDateChange={onFilterChange} />
            <button className="submitButton" onClick={fetchFilteredData}>
              Submit
            </button>
          </div>
          {data && data.length > 0 && <Table data={data} />}
        </div>
        <div style={{ width: "100%" }}>
          <StackedChart />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
