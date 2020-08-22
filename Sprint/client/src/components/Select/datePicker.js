import React, { useState } from "react";

import { DateRange } from "react-date-range";
import { formatDate } from "../../helpers/utils";
const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div className="dateRangeContainer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dateRangeTrigger"
      >{`${formatDate(state[0].startDate)} - ${formatDate(
        state[0].endDate
      )}`}</button>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      )}
    </div>
  );
};

export default DatePicker;
