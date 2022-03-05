import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import dayjs from 'dayjs'
// component
import { Button, Table } from 'antd'
import SearchComponent from '../SearchBar'
// styles
// types
import { IBEPaginationTable } from './interface'
import { PaginationEntity } from '../../../core/pagination'
import { OptionEntity } from '../../../core/table'

// initial state 
import { InitOption, InitPagination } from './interface'
import TicketEntity from '../../../module/ticket/entity'
import FilterButton from '../../../view/Magage/components/FilterButton'
import { useSingleAsync } from '../../hook/useAsync'

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

  const repository = useSingleAsync<TicketEntity[]>(apiServices)  

  useEffect(() => {
    if (apiServices) getDataWithCurrentState({ option: option})
  }, [option])
  console.log('current state: ', state)
  
  const getDataWithCurrentState = (_state?: {
    pagination?: PaginationEntity
    option?: OptionEntity
  }) => {
    console.log('inside method get data with current state', state, _state)
    const pagination = Object.assign({}, state?.pagination, _state?.pagination)
    const option = Object.assign({}, state?.option, _state?.option)
    setState(prev => ({ ...prev, option }))
    console.log(option.filter?.status !== 'all'  ||
    option.filter?.isDoingForControl !== 'all')
    if (apiServices && 
        (
          (option.filter?.status !== 'all' && option.filter?.status !== undefined)  ||
          (option.filter?.isDoingForControl !== 'all' && option.filter?.isDoingForControl !== undefined)
        ) 
      ) {
      repository?.execute(option.filter).then((res) => {
        setState(prev => ({
          ...prev,
          pagination: {...pagination, total: res.length}
        }))
      })
    } else {
      setState(prev => ({ ...prev, pagination}))
    }
  }
  // console.log(repository?.value)
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
      {props.filterButton && (<FilterButton getFilterProps={getDataWithCurrentState} />)}
      <Table
        {...props}
        className="main-table"
        dataSource={
          (
            (
              state.option.filter?.status === 'all'  ||
              state.option.filter?.isDoingForControl === 'all'
            ) 
          ) ?
          getDataAfterConvert(dataSource) : repository?.value
        }
        pagination={{ 
          ...state.pagination, 
          total: state.option?.filter?.status === 'all' || state.option?.filter?.isDoingForControl === 'all' ? dataSource?.length : state.pagination.total
        }}
        onChange={handleChangePage}
        columns={thisColumns}
        loading={repository?.status === 'loading'}
      />
    </div>
  )
}

export default React.memo(TableComponent)