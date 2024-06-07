import React, { useContext } from 'react'
import { CalculatorContext } from '../../App'

const SalaryViewer = () => {

    const { basicSalary,grossEarning, grossDeduction, employeeEPF, APIT, employerEPF, employerETF} = useContext(CalculatorContext);

  return (
    <div className='w-[480px] h-[614px] border-[1px] border-[#E0E0E0] rounded-[8px] p-[16px] max-lg:w-full max-lg:mx-32'>
        <h2 className='text-[20px] font-[700]'>Your Salary</h2>
        <table>
            <tr>
                <th className='items'>Items</th>
                <th className='amount'>Amount</th>
            </tr>
            <tr>
                <td className='items'>Basic Salary</td>
                <td className='amount'>{basicSalary.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items'>Gross Earning</td>
                <td className='amount'>{grossEarning.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items'>Gross Deduction</td>
                <td className='amount'>{grossDeduction.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items'>Employee EPF (8%)</td>
                <td className='amount'>{employeeEPF.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items'>APIT</td>
                <td className='amount'>{APIT.toFixed(2)}</td>
            </tr>
        </table>
        <div className='net-salary'>
            <p>Net Salary (Take Home)</p>
            <p>{(grossEarning-employeeEPF-APIT).toFixed(2)}</p>
        </div>
        <table>
            <tr>
                <th className='items'>Contribution from the Employer</th>
            </tr>
            <tr>
                <td className='items'>Employeer EPF (12%)</td>
                <td className='amount'>{employerEPF.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items'>Employeer ETF (8%)</td>
                <td className='amount'>{employerETF.toFixed(2)}</td>
            </tr>
            <tr>
                <td className='items pt-[32px]'>CTC (Cost to Company)</td>
                <td className='amount pt-[32px]'>{(grossEarning+employerEPF+employerETF).toFixed(2)}</td>
            </tr>
        </table>

    </div>
  )
}

export default SalaryViewer