import React, { useState, useEffect, memo } from "react";
import * as Icon from "react-feather";
import { Input } from "antd";
import lodash from 'lodash'
import { useIntl } from "react-intl";

interface Iprops {
  classNames?: string;
  placeholder?: string;
  onSearch?: (value) => void
  onChange?: (value) => void
}

const SearchComponent = (props: Iprops) => {
  const { classNames } = props;
  const [valueInput, setValueInput] = useState<string | undefined>();
  const intl = useIntl()

  const onChange = (e) => {
    const text = e.target.value;
    setValueInput(text);
    props?.onChange && props.onChange(text)
  };

  const onSearch = React.useMemo(() => {
    return lodash.debounce((text) => {
      props.onSearch && props.onSearch(text)
    }, 800)
  }, [props.onSearch])

  useEffect(() => {
    if (!valueInput) return;
    console.log("on search effect")
    onSearch(valueInput)
    return () => {onSearch.cancel()}
  }, [valueInput])

  return (
    <>
      <div className={`search-bar-wrapper ${classNames}`}>
        <Input
          type="text"
          onChange={onChange}
          placeholder={intl.formatMessage({
            id: props?.placeholder,
            defaultMessage: props?.placeholder,
          })}
        />
        <Icon.Search className="icon-search"/>
      </div>
    </>
  );
};
export default memo(SearchComponent);
