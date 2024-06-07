import React, { useState } from 'react'

const CheckBox = () => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };
  return (
    <label className='custom-checkbox'>
        <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
    </label>
  )
}

export default CheckBox