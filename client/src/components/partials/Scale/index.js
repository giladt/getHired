import React from 'react';
import { Mutation } from '@apollo/react-components';
import UpdateScaleForm from './scale_update_form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-regular-svg-icons';

// queries
import { UPDATE_SCALE, ADD_SCALE } from '../../../queries/queries';

// components
import Bars from './scale_bars';

class Scale extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      items: [...props.items],
      visible: false
    };

    this.level_scale ={
      skills: [
        'Fundamental Awareness',
        'Novice',
        'Intermediate',
        'Advanced',
        'Expert'
      ],
      languages: [
        'Elementary Proficiency',
        'Limited Working Proficiency',
        'Professional Working Proficiency',
        'Full Professional Proficiency',
        'Native / Bilingual Proficiency'
      ]
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  toggleEdit(val = null, newState = null) {
    if(newState !== null){
      this.setState({items: newState});
      this.setState({data: newState});
    } else {      
      this.setState({data: this.state.items});
    };


    (typeof val == 'boolean') 
      ? this.setState({visible: val})
      : this.setState({visible: !this.state.visible});
  }
  
  updateState(new_item) {
    console.log('NEW ITEM UPDATE STATE',new_item)
    this.setState({
      data: [...this.state.data, new_item],
      visible: false
    });
    this.toggleEdit(true, this.state.data);
  }

  handleChange(update_scale, e) {
    let value;

    console.log('EVENT', e.target);
    console.log('MUTATION', update_scale);

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

    let items = [...this.state.data];
    items[id]= {...items[e.target.id], [e.target.name]: value};
    
    if(e.target.type === 'submit'){
      // Update data and close edit mode
      this.state.data.map(item => 
        // mutate UPDATE_SCALE
        update_scale({
          variables: {
            table: this.props.title,
            _id: item._id,
            name: item.name,
            data: this.props.items,
            level: parseInt(item.level)
          }
        })
        .then(res => {
          this.toggleEdit(false, this.state.data);
          return res;
        })
        .catch(err => console.error('UPDATE_SCALE Mutation Error:', err))
      )
      this.toggleEdit(false, this.state.data);
    } else {
      // Update change to scale items
      console.log('ADD ITEM');
      this.setState({
        data: items
      });
    }
    
  }

  render(){
    if(this.state.items && this.state.items.length > 0) {
      return (
        <Mutation mutation={UPDATE_SCALE} key={ this.state.items._id } >
            {update_scale => (
              <Mutation mutation={ADD_SCALE} key={this.state.items._id+'new'} >
                  {add_scale => (
                  <article className={this.props.title.toLowerCase()}>
                    <h3>{this.props.title}</h3>
                    {!this.state.visible
                    ? <ul>
                      {this.state.items.map(
                        ( item ,idx ) => (
                          <Bars 
                            item={item} 
                            scale_idx={this.level_scale[this.props.title.toLowerCase()]} 
                            key={idx}
                          />
                        )
                      )}
                      </ul>
                    : <UpdateScaleForm 
                        add_scale={add_scale}
                        update_scale={update_scale}
                        styleName={this.props.styleName}
                        data={this.state.data}
                        table={this.props.title}
                        handleChange={this.handleChange.bind(this, update_scale)}
                        updateState={this.updateState}
                        toggleEdit={this.toggleEdit}
                        scale_idx={this.level_scale[this.props.title.toLowerCase()]} 
                        ref_id={this.props.ref_id}
                      />
                    }
                    {!this.state.visible
                    ? <div className='buttons'>
                        <button type="button" text={`Edit ${this.props.title}`} onClick={this.toggleEdit}>
                          <FontAwesomeIcon icon={faEdit} size='2x' />
                        </button>
                      </div>
                    : <div className='buttons'>
                        <button type="button" text='Discard changes' onClick={this.toggleEdit}>
                          <FontAwesomeIcon icon={faWindowClose} size='2x' />
                        </button>
                        <button type="submit" text='Save changes' onClick={this.handleChange.bind(this, update_scale)}>
                          <FontAwesomeIcon icon={faSave} size='2x' />
                        </button>
                      </div>
                    }
                    
                  </article>
                )}
              </Mutation>
            )}
          </Mutation>
      )
    } else return (<article></article>);
  };
};

export default Scale;