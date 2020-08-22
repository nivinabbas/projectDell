import React from "react";
import "./style.css";

/////////////Presenting Data Table/////////////

// data = [
//     {a:"a",b:"b"},
//     {a:"a2",b:"b2"},
// ]
const getTableData = (data) => {
  return data.map((d) => {
    return (
      <tr key={d._id}>
        {Object.keys(d).map((key) => {
          return <td>{d[key]}</td>;
        })}
      </tr>
    );
  });
};

const getTableHeader = (item) => {
  return (
    <tr>
      {Object.keys(item).map((key) => {
        return <th>{key}</th>;
      })}
    </tr>
  );
};

const Table = ({ data }) => {
  return (
    <table>
      <tbody className="container">
        {getTableHeader(data[0])}
        {getTableData(data)}
      </tbody>
    </table>
  );
};

export default Table;
