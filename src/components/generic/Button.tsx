import React from 'react';

interface ButtonProps {
  icon?: any;
  text: string;
  style: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`flex flex-row hover:cursor-pointer ${props.style}`}>
      {props.icon} {props.text}
    </button>
  );
}
