import React, { EventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { Mutation } from 'react-apollo';
import { DELETE_SCALE } from '../../../queries/queries';

class ScaleBar extends React.Component{
  
  hoverLabelStyle(item:any){
    const props:any = this.props;

    return (
    <style>
      {`
        #el${item}:hover::after{
          content: '${[...props.scale_idx][item - 1]}';
        }
      `}
    </style>
    )
  };

  render(){
    const scaleElements = [1,2,3,4,5];
    const props:any = this.props;

    return(
      <div>
        {scaleElements.map((item:any) => {
          const className = (parseInt(props.value) === parseInt(item))
                          ? 'el checked'
                          :'el';
          return (
            <label 
              key={parseInt(item)} 
              /*type='number'*/
              className={className}
              id={`el${parseInt(item)}`}
            >
              {this.hoverLabelStyle(parseInt(item))}
              <input 
                name='level' 
                id={props.id}
                checked={props.value === parseInt(item)}
                value={parseInt(item)}
                type='radio' 
                onChange={props.handleChange}
              />
            </label>
          )
        })}
      </div>
    )
  }
}

class UpdateScaleForm extends React.Component{
  constructor(props:any){
    super(props);
    this.state = {
      visible: false,
      new_item: {
        name: '',
        level: -1
      }
    };

    this.toggleNewScale = this.toggleNewScale.bind(this);
    this.handleChange = this.handleChange.bind(this);
 }

  toggleNewScale(e:Event) {
    e.preventDefault();
    const state:any = this.state;
    this.setState({visible: !state.visible});
  }

  handleChange(e:any) {
    const state:any = this.state;
    let value;
    switch(e.target.type){
      case 'radio':
        value = parseInt(e.target.value);
        if(value < 1) value = 1;
        if(value > 5) value = 5;
        break;
      default:
        value = e.target.value.toString();
    }

    const id = parseInt(e.target.id);

    if(id === 999){
      this.setState({
        new_item: {...state.new_item, [e.target.name]: value}
      })
    }
  }

  handleDelete(delete_scale:any, e:any) {
    e.preventDefault();
    const id:any = e.target.id;
    const props:any = this.props;

    delete_scale({
      variables: {
        table: props.table,
        _id: id
      }
    }).then((res:any) => {
      console.log("DELETE_SCALE:", res.data.DeleteScale._id);
      let data = [...props.data].filter(item => item._id !== res.data.DeleteScale._id);
      props.toggleEdit(true, data);
      return res;
    })
    .catch((err:any) => console.error('DELETE_SCALE Mutation Error:', err));
  }

  render(){
    const state:any = this.state;
    const props:any = this.props;

    return (
      <Mutation mutation={DELETE_SCALE} >
      {(delete_scale:any)=>(
      <form onSubmit={(e)=>{ 
        console.log('Submitting newly added scale item.');
        e.preventDefault();
        if(
            state.visible && 
            state.new_item &&
            state.new_item.name &&
            state.new_item.name.length > 1 &&
            state.new_item.level &&
            state.new_item.level > 0
          ){
          // mutate ADD_SCALE
            props.add_scale({
              variables: {
                table: props.table,
                ref_id: props.ref_id,
                name: state.new_item.name,
                level: parseInt(state.new_item.level)
              }
            }).then((res:any) => {
              props.updateState(res.data.AddScale);
              return res;
            })
            .catch((err:any) => console.error('ADD_SCALE | Mutation Error:', err))
        } else {
          console.warn('Fields are not allowed to be empty. Please fill all fields and try again.');
        }
        }}>
          {props.data.map((item:any, idx:number) =>
            {let id;
                (!item._id) ? id = idx+1 : id = item._id;
                return(
                  <div key={id}>
                    <input 
                      name="name" 
                      alt="Name" 
                      type="text" 
                      id={idx.toString()} 
                      value={ item.name } 
                      onChange={ props.handleChange } 
                    />
                    <ScaleBar 
                      name="level"
                      alt="Level" 
                      type="number" 
                      id={idx} 
                      scale_idx={props.scale_idx}
                      value={ item.level }
                      handleChange={ props.handleChange } 
                    />
                        <button 
                          className='deleteButton sm'
                          id = {item._id}
                          text = {`Delete ${item.name}`}
                          onClick={this.handleDelete.bind(this, delete_scale)}
                          >
                          <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                        </button>
                    </div>
                )
              }
            )}
            {!state.visible
            ? <BtnAddItem data={props.data} text={props.table} clickEvent={this.toggleNewScale} />
            : <BtnSaveDiscard 
                data={props.data} 
                text={props.table} 
                new_item={state.new_item} 
                idx={props.scale_idx} 
                eventHandler={this.handleChange} 
                />
            }
        </form>
        )}
        </Mutation>
      )
  };
};

class BtnAddItem extends React.Component {
  render(){
    const props:any = this.props;

    return(
      <div key={props.data.length}>
        <button type="button" text={`Add new ${props.text}`} onClick={props.clickEvent}>
          <FontAwesomeIcon icon={faPlusSquare} size='2x' />
        </button>
      </div>      
    )
  }
}

class BtnSaveDiscard extends React.Component {
  render(){
    const props:any = this.props;

    return(
      <div key={props.data.length-1} className='button'>
        <input 
          name="name" 
          alt="Name" 
          type="text" 
          id={999}
          value={ props.new_item.name }
          onChange={ props.eventHandler } 
        />
        <ScaleBar 
          name="level" 
          alt="Level" 
          type="number" 
          id={999} 
          value={props.new_item.level}
          scale_idx={props.idx}
          handleChange={ props.eventHandler } 
        />
        <button type="submit" text={`Save new ${props.text}`} onClick={props.clickEvent} >
          <FontAwesomeIcon icon={faSave} size='2x' />
        </button>
      </div>      
    )
  }
}

export default UpdateScaleForm;