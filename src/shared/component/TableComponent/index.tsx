import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import dayjs from 'dayjs'
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
import { useSingleAsync } from '../../hook/useAsync'
import TicketEntity from '../../../module/ticket/entity'

interface  IState {
  pagination: PaginationEntity
  option: OptionEntity
}

const TableComponent = ( props: IBEPaginationTable ) => {
  let {
    apiServices,
    columns = [],
    option,
    disableFirstCallApi = false,
    dataSource = [],
    search,
    hasStt = false,
  } = props;
  console.log(option)
  const [ state, setState ] = useState<IState>({
    pagination: { ...InitPagination, ...props.pagination },
    option: { ...InitOption, ...option }
  })
  const intl = useIntl()
  console.log('current state: ', state)
  
  useEffect(() => {
    console.log('render')
    if (!disableFirstCallApi && apiServices) getDataWithCurrentState();
  }, [apiServices]);
  
  const getDataWithCurrentState = (_state?: {
    pagination: PaginationEntity
    option: OptionEntity | undefined
  }) => {
    console.log('inside method get data with current state', _state)
    const pagination = Object.assign({}, state?.pagination, _state?.pagination)
    const option = Object.assign({}, state?.option, _state?.option)
    setState(prev => ({ ...prev, option, pagination }))
  }
  
  const handleChangePage = (
    newPagination: PaginationEntity,
    _filter?,
    _sorter?
  ) => {
    let option = state.option;
    // option.sorter = _sorter;
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

  const getDataAfterConvert = (data) =>  data?.map((entity) => ({...entity,
    key: entity.id,
    useDate: dayjs.unix(entity?.useDate?.seconds).format('DD-MM-YYYY'),
    outDate: dayjs.unix(entity?.outDate?.seconds).format('DD-MM-YYYY')
  }))

  const thisColumns = React.useMemo(() => {
    // xét từng column một

    if (hasStt) {
      const hasSttColumn = {
        title: intl.formatMessage({
          id: "common.stt",
          defaultMessage: "STT",
        }),
        width: "5.9rem",
        className:'text-center',
        dataIndex: "tableComponentStt",
        render: (text, record, index) => {
          const num =state.pagination.current||1;
          const pageSize=state.pagination.pageSize||1
          return ((num - 1) * pageSize) +(index + 1);
        },
      };
      return [hasSttColumn, ...columns];
    }
    //dịch mỗi thằng
    return columns
  }, [hasStt, columns, state.pagination]);

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
        dataSource={getDataAfterConvert(dataSource)}
        pagination={state.pagination}
        onChange={handleChangePage}
        columns={thisColumns}
        loading={props.loading}
      />
    </div>
  )
}

export default React.memo(TableComponent)