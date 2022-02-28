import { TableProps } from "antd";
import { OptionEntity } from "../../../core/table";
import { PaginationEntity } from "../../../core/pagination"
// import { IRef } from "./hook";
import React from 'react'

export interface IBEPaginationTable extends TableProps<any> {
  apiServices?: Function;
  columns?: any[];
  defaultOption?: OptionEntity;
//   register?: IRef;
//   translateFirstKey?: string;
//   getDataAfter?: (data) => void;
  disableFirstCallApi?: boolean;
  search?: {
    placeholder: string;
    align?: "left" | "right";
    className?: string;
  };
  hasStt?: boolean;
  onRowSelect?: (params: React.Key[]) => void;
  summaryKey?: string;
  onRowSelectDetail?: (params: React.Key[]) => void;
}

export const InitOption: OptionEntity = {
    search: "",
    // tới dự án nào dùng tới filter sorter rồi bỏ comment ra nha
    // filter: {},
    // sorter: {
    //   sortField: "",
    //   sortOrder: "",
    // },
};
  
export const InitPagination: PaginationEntity = {
    pageSize: 12,
    total: 120,
    showSizeChanger: false
};