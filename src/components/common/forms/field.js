import React from 'react';




export default ({
    type,className, labelclass, label,id,ref
}) => (
  <>
    <input
      type={type}
      className={className}
      id={id}
      ref={ref}
    />
    &nbsp;
    <label class={labelclass} for={id}>
      {label}
    </label>
  </>
);