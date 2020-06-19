
import React from 'react';

interface Props {
  first: string,
  last: string
}

export default function FullName(props:Props){
  let full_name = [props.first,props.last].join(' ').trim();
  return (
    <span>{full_name}</span>
  );
}
