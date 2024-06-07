import { createContext, useEffect, useState } from 'react';
import './App.css';
import Calculator from './components/calculator/Calculator';
import SalaryViewer from './components/viewer/SalaryViewer';

export const CalculatorContext = createContext();

function App() {
  const [earnings, setEarnings] = useState([]);
  const [deductions, setDeductions] = useState([]);

  const [basicSalary, setBasicSalary] = useState(200000);
  const [grossEarning, setGrossEarning] = useState(0);
  const [grossDeduction, setGrossDeduction] = useState(0);
  const [employeeEPF, setEmployeeEPF] = useState(0);
  const [APIT, setAPIT] = useState(0);

  const [employerEPF, setEmployerEPF] = useState(0);
  const [employerETF, setEmployerETF] = useState(0);

  // const [CTC, setCTC] = useState();


  useEffect(()=>{
    calculateGrossDeduction();
    calculateGrossEarnings();
    calculateEpfEtf();
    calculateAPIT();
  })

  console.log(earnings)

  const calculateGrossDeduction = () => {
    let grossDeductionTemp = 0;
    deductions.forEach(deduction=>{
      grossDeductionTemp+=deduction.amount;
    })
    setGrossDeduction(grossDeductionTemp);
  }


  // Depends on gross deduction
  const calculateGrossEarnings = () => {
    let totalEarnings = basicSalary;
    earnings.forEach(earning=>{
      totalEarnings += earning.amount;
    })
    setGrossEarning(totalEarnings-grossDeduction);
  }

  // depends on gross deduction
  const calculateEpfEtf = () => {
    let totalEarningsForEPF = basicSalary;
    earnings.forEach(earning=> {
      if (earning.isEpfEtf)
        totalEarningsForEPF += earning.amount
    })

    const grosSalaryForEPF = totalEarningsForEPF-grossDeduction;

    // 8%
    setEmployeeEPF(grosSalaryForEPF*0.08);
    // 12%
    setEmployerEPF(grosSalaryForEPF*0.12);
    // 3%
    setEmployerETF(grosSalaryForEPF*0.03);
  }

  const calculateAPIT = () => {
    if (grossEarning>308333)
      setAPIT(grossEarning*0.36-73500)
    else if (grossEarning>266667)
      setAPIT(grossEarning*0.3-55000)
    else if(grossEarning>225000)
      setAPIT(grossEarning*0.24-39000)
    else if(grossEarning>183333)
      setAPIT(grossEarning*0.18-25500)
    else if(grossEarning>141667)
      setAPIT(grossEarning*0.12-14500)
    else if(grossDeduction>100000)
      setAPIT(grossEarning*0.06-6000)
    else
      setAPIT(0);
  }

  return (
    <CalculatorContext.Provider value={{
      // states
      basicSalary,
      earnings,
      deductions,

      grossEarning,
      grossDeduction,
      employeeEPF,
      APIT,

      employerEPF,
      employerETF,
      // CTC,

      // setStates
      setBasicSalary,
      setEarnings,
      setDeductions

    }} >
      <div className="lg:h-screen w-full flex items-center justify-center gap-[24px] max-lg:flex-col">
        <Calculator />
        <SalaryViewer />
      </div>
    </CalculatorContext.Provider>
  );
}

export default App;
