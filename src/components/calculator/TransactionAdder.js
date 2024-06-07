import React, { useContext, useEffect, useState } from 'react';
import CrossIcon from '../../assets/cross_icon.svg';
import { CalculatorContext } from '../../App';
import CheckedIcon from "../../assets/checked_icon.svg"

const TransactionAdder = ({id, isEarning, unmountTransactionAdder}) => {

    const {earnings, deductions, setEarnings, setDeductions} = useContext(CalculatorContext);
    const [earning, setEarning] = useState({
        id,
        payDetails:"",
        amount:0,
        isEpfEtf:false
    })

    useEffect(()=>{
            const updateTransactions = (array, setArray) => {
                let updatedArray;
                const existingIndex = array.findIndex(item => item.id === earning.id);
                if (existingIndex !== -1) {
                    updatedArray = [...array];
                    updatedArray[existingIndex] = earning;
                    setArray(updatedArray);
                } else {
                    setArray(prevEarnings => [...prevEarnings, earning]);
                }
            }

            if (isEarning) {
                updateTransactions(earnings, setEarnings);
            } else {
                updateTransactions(deductions, setDeductions);
            }
        return () => {
            (isEarning)?
            setEarnings(earnings.filter(e=>earning.id!==e.id))
            :
            setDeductions(deductions.filter(d=>earning.id!==d.id));
        }
    })

    const handleInputChange = (e, field) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setEarning(prevEarning => ({ ...prevEarning, [field]: value }));
    };
   
    return (
        <div className='flex items-center gap-[8px] max-md:flex-col max-md:w-full'>
            <input className='text-input w-[212px] max-md:w-full' value={earning.payDetails} onChange={(e) => setEarning(prevEarning=>({...prevEarning, payDetails:e.target.value}))} type='text' placeholder='Pay Details (Title)' />
            <input className='text-input w-[212px] max-md:w-full' value={earning.amount===0?'':earning.amount} onChange={(e) => setEarning(prevEarning=>({...prevEarning, amount:Number(e.target.value)}))} type='number' placeholder='Amount' />
            <div className='max-md:w-full max-md:flex max-md:flex-col-reverse gap-[8px] max-md:items-center flex'>
                <button className='bg-[#EFEFEF] rounded-full w-[32px] h-[32px] flex items-center justify-center' onClick={()=>unmountTransactionAdder(id)}><img src={CrossIcon} className='w-[12px] h-[12px]' alt="Close" /></button>
                {isEarning &&
                    <div className='flex items-center gap-[8px] max-md:w-full'>
                        <div className='relative flex items-center justify-center'>
                            <input type='checkbox' className='check-box' checked={earning.isEpfEtf} onChange={(e) => handleInputChange(e, 'isEpfEtf')} />
                            {earning.isEpfEtf?<div className='checked-icon-wrapper' onClick={()=>setEarning(prevEarning=>({...prevEarning,isEpfEtf:false}))}><img src={CheckedIcon} className='checked-icon' alt='checked' /></div>:null}
                        </div>
                        <p className='text-[16px]'>EPF/ETF</p>
                    </div>
                }
            </div>
        </div>
        )
}

export default TransactionAdder