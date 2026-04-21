"use client";

import { Cascader } from "antd";
import { codeToText, regionData } from "element-china-area-data";

type LocationValue = string[];

type LocationSelectorProps = {
  value: LocationValue;
  onChange: (value: LocationValue) => void;
};

export function formatLocation(value: LocationValue) {
  if (value.length !== 3) {
    return "";
  }

  return value
    .map((item) => codeToText[item])
    .filter(Boolean)
    .join(" ");
}

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  return (
    <div className="w-full">
      <Cascader
        options={regionData}
        value={value}
        onChange={(nextValue) => onChange((nextValue as string[]) ?? [])}
        placeholder="请选择省 / 市 / 区县"
        className="liuyao-cascader"
        popupClassName="liuyao-cascader-popup"
        allowClear={false}
        showSearch
        changeOnSelect={false}
        style={{ width: "100%" }}
      />
    </div>
  );
}
