'use client';
import React from 'react';
import TextareaAutoSize from 'react-textarea-autosize';

interface TextareaProps {
  style: string;
  placeholder?: string;
  onChange?: any;
  value?: string;
  onKeyPress?: any;
}

export default function Textarea(props: TextareaProps) {
  return (
    <>
      <TextareaAutoSize
        onKeyDown={props.onKeyPress}
        value={props.value}
        className={props.style}
        placeholder={props.placeholder}
        onChange={props.onChange}
        maxRows={9}
      />
    </>
  );
}
