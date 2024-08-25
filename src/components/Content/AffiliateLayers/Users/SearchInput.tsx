import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { AutoCompleteProps } from "antd/lib/auto-complete";

const { Search } = Input;

interface OptionType {
  value: string;
  label: string;
}
interface Props {
  categories: string[];
  val: string;
  func: any;
}

const SearchInput: React.FC<Props> = ({ categories, val, func }) => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  const handleSearch = (value: string) => {
    if (value) {
      const filteredOptions: OptionType[] = categories
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({ value: item, label: item }));
      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  const handleSelect = (value: string) => {
    func(value);
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      style={{ width: 200 }}
      onSelect={handleSelect}
      value={val}
    >
      <Search
        placeholder="Search..."
        enterButton
        onChange={(e: any) => func(e.target.value)}
      />
    </AutoComplete>
  );
};

export default SearchInput;
