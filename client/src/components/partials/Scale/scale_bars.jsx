import React from 'react';

class Bars extends React.Component{
  render(){
    const bars = [];
    const checked = this.props.item.level;
    for(let i=0; i < 5; i++){
      const isChecked = (checked === i+1)? 'checked':'';
      bars.push(
        <li key={i} className={isChecked}></li>
      );
    };

    return(
      (this.props.item) 
      ? <div id={`el${this.props.item._id}`} className='el' key={ this.props.item._id }>
        <style>
          {`
            #el${this.props.item._id}:hover::after{
              content: '${[...this.props.scale_idx][this.props.item.level - 1]}';
            }
          `}
        </style>
        <span>{ this.props.item.name }</span>
        <ul key={ this.props.idx }>
          {bars}
        </ul>
      </div>
    : <span></span>
    );
  }
}

export default Bars;