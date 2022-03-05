import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { FiFilter } from 'react-icons/fi';
import FilterComponent from '../FilterModalComponent';
import { PaginationEntity } from '../../../../core/pagination';
import { OptionEntity } from '../../../../core/table';

interface Iprops {
    getFilterProps: (_state?: {
        pagination?: PaginationEntity | undefined;
        option?: OptionEntity | undefined;
    } | undefined) => void
}

const FilterButton: React.FC<Iprops> = ({ getFilterProps }) => {
    const [ isShowModal, setIsShowModal ] = useState<boolean>(false)
    const handleShowModal = () => {
        setIsShowModal(true)
      }
    
      const handleOk = () => {
        setIsShowModal(false);
      };
    
      const handleCancel = () => {
        setIsShowModal(false);
      };
      
  return (
    <>
      <Button onClick={handleShowModal}><FiFilter /> &nbsp; Lọc vé</Button>
      <Modal title="Lọc vé"  key="3"
        visible={isShowModal} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={[ <Button onClick={() => setIsShowModal(false)}>Lọc</Button>]}
        >
       <FilterComponent 
        isShowModal={isShowModal}
        setFilter={getFilterProps} 
      />
      </Modal>
    </>
  )
}

export default FilterButton