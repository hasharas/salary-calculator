import React from 'react'
import TransactionAdder from './TransactionAdder'
import PlusIcon from '../../assets/plus_icon.svg'

const Earnings = ({activeTransactionAdderIds, setActiveTransactionAdderIds}) => {

    const addNewTransactionAdder = () => {
      setActiveTransactionAdderIds(prev=>([...prev,prev.length+1]))
    }

    const removeTransactionAdder = (id) => {
      setActiveTransactionAdderIds(prev=>prev.filter(elm=>elm!==id))
    }

  return (
    <div className='flex flex-col gap-[16px] max-md:w-full'>
        <div className='flex flex-col gap-[8px]'>
            <div className='flex flex-col gap-[4px]'>
              <h2 className='subtitle'>Earnings</h2>
              <p className='description'>Allowance, Fixed Allowance, Bonus and etc.</p>
            </div>
            <div className='flex flex-col items-start gap-[8px] max-md:w-full'>{activeTransactionAdderIds.map(elm=><TransactionAdder key={elm} id={elm} unmountTransactionAdder={removeTransactionAdder} isEarning={true} />)}</div>
        </div>
        <p className='add-new-button' onClick={addNewTransactionAdder}><img src={PlusIcon} alt='plus' /> Add New Allowance</p>
    </div>
  )
}

export default Earnings