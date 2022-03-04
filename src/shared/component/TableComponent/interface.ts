import { TableProps } from "antd";
import { OptionEntity } from "../../../core/table";
import { PaginationEntity } from "../../../core/pagination"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
// import { IRef } from "./hook";
import React, { ReactNode } from 'react'
import { AppDispatch, AppThunk } from "../../../core/store";

export interface IBEPaginationTable extends TableProps<any> {
  apiServices?: (any) => Promise<firebase.firestore.DocumentData[]>
  columns?: any[];
  option?: OptionEntity;
  getDataAfter?: (data) => void;
  disableFirstCallApi?: boolean;
  search?: {
    placeholder: string;
    align?: "left" | "right";
    className?: string;
  }
  filterButton?: {
    className?: string
    title?: string
  }
  exportButton?: {
    className?: string
    title?: string
  }
  moreButton?: {
    className?: string
    title?: string
  }
  hasStt?: boolean;
  onRowSelect?: (params: React.Key[]) => void;
  summaryKey?: string;
  onRowSelectDetail?: (params: React.Key[]) => void;
}

export const InitOption: OptionEntity = {
    search: "",
    // tới dự án nào dùng tới filter sorter rồi bỏ comment ra nha
    filter: {},
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