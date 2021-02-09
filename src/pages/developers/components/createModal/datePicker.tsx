/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HTMLAttributes, useEffect, useRef } from "react";
import { FormErrorMessage } from "@chakra-ui/react";
import { useField } from "@unform/core";

import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

interface IProps {
  name: string;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  isClearable?: boolean;
  showPopperArrow?: boolean;
}

export default ({
  name,
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...rest
}: IProps & HTMLAttributes<HTMLElement>): JSX.Element => {
  return (
    <>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
      />
    </>
  );
};
