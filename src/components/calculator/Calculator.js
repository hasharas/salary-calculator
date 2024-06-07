import React, { useContext, useState } from 'react'
import Earnings from './Earnings';
import Deductions from "./Deductions";
import RefreshIcon from "../../assets/refresh_icon.svg";
import { CalculatorContext } from '../../App';

const Calculator = () => {

  const {basicSalary, setBasicSalary, setEarnings, setDeductions} = useContext(CalculatorContext);

  const [activeEarningAdders, setActiveEarningAdders] = useState([]);
  const [activeDeductionAdders, setActiveDeductionAdders] = useState([]);

  const reset = () => {
    setBasicSalary(0);
    setActiveDeductionAdders([]);
    setActiveEarningAdders([]);
    setEarnings([]);
    setDeductions([]);
  }

  return (
    <div className='border-[#E0E0E0] border-[1px] bg-[#FAFAFA] w-[680px] h-[616px] max-md:h-full max-lg:w-full p-5 flex justify-between items-start rounded-lg lg:overflow-auto'>
        <div className='h-full flex flex-col items-start justify-start gap-[24px] w-full'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='heading'>Calculate Your Salary</h1>
            <p className='flex items-center gap-[10px] text-[#0052EA] text-[14px] font-[500] cursor-pointer' onClick={reset}><img src={RefreshIcon} className='w-[24px] h-[24px]' alt='reset' /> Reset</p>
          </div>
          <div className='max-md:w-full flex flex-col gap-[8px]'>
            <h2 className='subtitle'>Basic Salary</h2>
            <input type='number' value={basicSalary===0?'':basicSalary} onChange={e=>setBasicSalary(Number(e.target.value))} className='text-input outline-none w-[356px] h-[48px] max-md:w-full' />
          </div>
          <Earnings activeTransactionAdderIds={activeEarningAdders} setActiveTransactionAdderIds={setActiveEarningAdders} />
          <div className='border-[1px] border-[#E0E0E0] w-full'></div>
          <Deductions activeTransactionAdderIds={activeDeductionAdders} setActiveTransactionAdderIds={setActiveDeductionAdders} />
        </div>
    </div>
  )
}

export default Calculator;