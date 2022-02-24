import React, { useState, useEffect, memo } from "react";
import * as Icon from "react-feather";
import { Input } from "antd";

interface Iprops {
  classNames?: string;
  placeholder?: string;
}

const SearchComponent = (props: Iprops) => {
  const { classNames } = props;
  const [valueInput, setValueInput] = useState<string | undefined>();

  const onChange = (e) => {
    const text = e.target.value;
    setValueInput(text);
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <Input
          type="text"
          onChange={onChange}
          placeholder={props?.placeholder}
          />
      </div>
      <Icon.Search className="icon-search"/>
    </>
  );
};
export default memo(SearchComponent);
