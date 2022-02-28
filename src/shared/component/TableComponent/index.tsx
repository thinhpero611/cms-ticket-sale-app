import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
// component
import { Table } from 'antd'
import SearchComponent from '../SearchBar'
// styles
import { GoPrimitiveDot } from 'react-icons/go'
// types
import { IBEPaginationTable } from './interface'
import { PaginationEntity } from '../../../core/pagination'
import { OptionEntity } from '../../../core/table'

// initial state 
import { InitOption, InitPagination } from './interface'

interface  IState {
  pagination: PaginationEntity
  option: OptionEntity
}

const TableComponent = ( props: IBEPaginationTable ) => {
  let {
    apiServices,
    columns = [],
    defaultOption,
    disableFirstCallApi = false,
    dataSource = [],
    search,
    hasStt = false,
  } = props;
  const [ state, setState ] = useState<IState>({
    pagination: { ...InitPagination, ...props.pagination },
    option: { ...defaultOption, ...InitOption }
  })
  const intl = useIntl()
  // const [repository] = useAsync(apiServices||Promise.resolve); fetch data

  useEffect(() => {
    if (!disableFirstCallApi && apiServices) getDataWithCurrentState();
  }, [apiServices]);

  const getDataWithCurrentState = (_state?: {
    pagination: PaginationEntity
    option: OptionEntity
  }) => {
    console.log('inside method get data with current state', _state)
    const pagination = Object.assign({}, state?.pagination, _state?.pagination)
    const option = Object.assign({}, state?.option, _state?.option)
    setState(prev => ({ ...prev, pagination, option}))
    // if (apiServices) {
    //   // fetch data
    // } else {
    //   setState((prev) => ({ ...prev, pagination }));
    // }
  }

  const handleChangePage = (
    newPagination: PaginationEntity,
    _filter?,
    _sorter?
  ) => {
    let option = state.option;
    // option.sorter = _sorter;
    console.log('new pagination', newPagination)
    let newCurrent = newPagination.current;
    if (newPagination.pageSize != state.pagination.pageSize) {
      newCurrent = 1;
    }
    getDataWithCurrentState({
      pagination: { ...newPagination, current: newCurrent },
      option,
    });
  };

  const handleSearch = (text) => {
    console.log("render table  ", text)
    const pagination = InitPagination
    const option = {
      search: text
    }
    getDataWithCurrentState({ pagination, option })
  }

  // const onRow = ( record, rowIndex ) => ({
  //   onClick: () => {
  //     handleClickOnRow(record)
  //   }
  // })
  return (
    <div className={`card-main-table ${props?.className ? props.className : ''}`}>
      {search?.placeholder && (
        <div className="search-in-table">
          <SearchComponent
            onSearch={handleSearch}
            placeholder={search?.placeholder}
            classNames={search?.className ? search?.className : ""}
          />
        </div>
      )}
      <Table
        {...props}
        className="main-table"
        dataSource={dataSource}
        pagination={state.pagination}
        onChange={handleChangePage}
        columns={columns}

      />
    </div>
  )
}

export default TableComponent