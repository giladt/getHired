
import React from 'react';

export default function FullName(props){
  let full_name = [props.first,props.last].join(' ').trim();
  return (
    <span>{full_name}</span>
  );
}
