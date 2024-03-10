import React from 'react';

interface ButtonProps {
  icon?: any;
  text?: string;
  style: string;
  onClick?: any;
}

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`flex flex-row hover:cursor-pointer ${props.style}`}>
      {props.icon} {props.text}
    </button>
  );
}
