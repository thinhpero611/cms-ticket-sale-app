import React, { useState, useEffect, memo } from "react";
import * as Icon from "react-feather";
import { Input } from "antd";
// phan nay em tham khaor template cua cong ty a
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
    <div className={`search-bar ${classNames ? classNames : ""}`} >
      <Input
        type="text"
        onChange={onChange}
        placeholder={props?.placeholder}
        suffix={<Icon.Search />}
      />
      {/* <a className="icon-search" onClick={() => props.onClick(valueInput)}>
        <Icon.Search />
      </a> */}
    </div>
  );
};
export default memo(SearchComponent);
