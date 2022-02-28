import { SorterResult } from "antd/lib/table/interface";

export class OptionEntity {
    search?: string;
    filter?: { [propName: string]: string | number; };
    sorter?: SorterResult<any>;
    constructor(option) {
        if (option == null) return;
        Object.assign(this, option);    
    }
}
