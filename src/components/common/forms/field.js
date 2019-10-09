import React from 'react';




export default ({
    type,className, labelclass, label,id,ref,onChange,value
}) => (
  <>
    <input
      value={value}
      type={type}
      className={className}
      id={id}
      ref={ref}
      onChange={onChange}
    />
    &nbsp;
    <label class={labelclass} for={id}>
      {label}
    </label>
  </>
);