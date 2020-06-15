import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Mutation } from 'react-apollo';
import { DELETE_SCALE } from '../../../queries/queries';

class ScaleBar extends React.Component{
  
  hoverLabelStyle(item){
    return (
    <style>
      {`
        #el${item}:hover::after{
          content: '${[...this.props.scale_idx][item - 1]}';
        }
      `}
    </style>
    )
  };

  render(){
    let scaleElements = [1,2,3,4,5];
    

    return(
      <div>
        {scaleElements.map((item) => {
          let className = (parseInt(this.props.value) === parseInt(item))
                          ? 'el checked'
                          :'el';
          return (
            <label 
              key={item} 
              type='number'
              className={className}
              id={`el${item}`}
            >
              {this.hoverLabelStyle(item)}
              <input 
                name='level' 
                id={this.props.id}
                checked={this.props.value === item} 
                value={item}
                type='radio' 
                onChange={this.props.handleChange}
              />
            </label>
          )
        })}
      </div>
    )
  }
}

class UpdateScaleForm extends React.Component{
  constructor(props){
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

  toggleNewScale(e) {
    e.preventDefault();
    this.setState({visible: !this.state.visible});
  }

  handleChange(e) {
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
        new_item: {...this.state.new_item, [e.target.name]: value}
      })
    }
  }

  handleDelete(delete_scale, e) {
    e.preventDefault();
    let id = e.target.id;

    delete_scale({
      variables: {
        table: this.props.table,
        _id: id
      }
    }).then(res => {
      console.log("DELETE_SCALE:", res.data.DeleteScale._id);
      let data = [...this.props.data].filter(item => item._id !== res.data.DeleteScale._id);
      this.props.toggleEdit(true, data);
      return res;
    })
    .catch(err => console.error('DELETE_SCALE Mutation Error:', err));
  }

  render(){
    return (
      <Mutation mutation={DELETE_SCALE} >
      {delete_scale=>(
      <form onSubmit={(e)=>{ 
        console.log('Submitting newly added scale item.');
        e.preventDefault();
        if(
            this.state.visible && 
            this.state.new_item &&
            this.state.new_item.name &&
            this.state.new_item.name.length > 1 &&
            this.state.new_item.level &&
            this.state.new_item.level > 0
          ){
          // mutate ADD_SCALE
            this.props.add_scale({
              variables: {
                table: this.props.table,
                ref_id: this.props.ref_id,
                name: this.state.new_item.name,
                level: parseInt(this.state.new_item.level)
              }
            }).then((res) => {
              this.props.updateState(res.data.AddScale);
              return res;
            })
            .catch(err => console.error('ADD_SCALE | Mutation Error:', err))
        } else {
          console.warn('Fields are not allowed to be empty. Please fill all fields and try again.');
        }
        }}>
          {this.props.data.map((item, idx) =>
            {let id;
                (!item._id) ? id = idx+1 : id = item._id;
                return(
                  <div key={id}>
                    <input 
                      name="name" 
                      alt="Name" 
                      type="text" 
                      id={idx} 
                      value={ item.name } 
                      onChange={ this.props.handleChange } 
                    />
                    <ScaleBar 
                      name="level" 
                      alt="Level" 
                      type="number" 
                      id={idx} 
                      scale_idx={this.props.scale_idx}
                      value={ item.level }
                      handleChange={ this.props.handleChange } 
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
            {!this.state.visible
            ? <BtnAddItem data={this.props.data} text={this.props.table} clickEvent={this.toggleNewScale} />
            : <BtnSaveDiscard 
                data={this.props.data} 
                text={this.props.table} 
                new_item={this.state.new_item} 
                idx={this.props.scale_idx} 
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
    return(
      <div key={this.props.data.length}>
        <button type="button" text={`Add new ${this.props.text}`} onClick={this.props.clickEvent}>
          <FontAwesomeIcon icon={faPlusSquare} size='2x' />
        </button>
      </div>      
    )
  }
}

class BtnSaveDiscard extends React.Component {
  render(){
    return(
      <div key={this.props.data.length-1} className='button'>
        <input 
          name="name" 
          alt="Name" 
          type="text" 
          id={999} 
          value={ this.props.new_item.name }
          onChange={ this.props.eventHandler } 
        />
        <ScaleBar 
          name="level" 
          alt="Level" 
          type="number" 
          id={999} 
          value={this.props.new_item.level}
          scale_idx={this.props.idx}
          handleChange={ this.props.eventHandler } 
        />
        <button type="submit" text={`Save new ${this.props.text}`} onClick={this.props.clickEvent} >
          <FontAwesomeIcon icon={faSave} size='2x' />
        </button>
      </div>      
    )
  }
}

export default UpdateScaleForm;