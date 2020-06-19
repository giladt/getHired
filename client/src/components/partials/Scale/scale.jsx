import React from 'react';
import { Mutation } from '@apollo/react-components';
import UpdateScaleForm from './scale_update_form.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-regular-svg-icons';

// queries
import { UPDATE_SCALE, ADD_SCALE } from '../../../queries/queries';

// components
import Bars from './scale_bars';

class Scale extends React.Component{
  constructor(props:any){
    super(props);

    this.state = {
      items: [...props.items],
      visible: false,
      
      level_scale:{
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
    };
    
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  toggleEdit(val:any = null, newState:any = null) {
    let state:any = this.state;

    if(newState !== null){
      this.setState({items: newState});
      this.setState({data: newState});
    } else {      
      this.setState({data: state.items});
    };


    (typeof val == 'boolean') 
      ? this.setState({visible: val})
      : this.setState({visible: !state.visible});
  }
  
  updateState(new_item:any) {
    let state:any = this.state;
    console.log('NEW ITEM UPDATE STATE',new_item)
    this.setState({
      data: [...state.data, new_item],
      visible: false
    });
    this.toggleEdit(true, state.data);
  }

  handleChange(update_scale:any, e:any) {
    let value;
    let state:any = this.state;
    const props:any = this.props;

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

    let items = [...state.data];
    items[id]= {...items[e.target.id], [e.target.name]: value};
    
    if(e.target.type === 'submit'){
      // Update data and close edit mode
      state.data.map((item:any) => 
        // mutate UPDATE_SCALE
        update_scale({
          variables: {
            table: props.title,
            _id: item._id,
            name: item.name,
            data: props.items,
            level: parseInt(item.level)
          }
        })
        .then((res:any) => {
          this.toggleEdit(false, state.data);
          return res;
        })
        .catch((err:any) => console.error('UPDATE_SCALE Mutation Error:', err))
      )
      this.toggleEdit(false, state.data);
    } else {
      // Update change to scale items
      console.log('ADD ITEM');
      this.setState({
        data: items
      });
    }
    
  }

  render(){
    let state:any = this.state;
    let props:any = this.props;

    if(state.items && state.items.length > 0) {
      return (
        <Mutation mutation={UPDATE_SCALE} key={ state.items._id } >
            {(update_scale:any) => (
              <Mutation mutation={ADD_SCALE} key={state.items._id+'new'} >
                  {(add_scale:any) => (
                  <article className={props.title.toLowerCase()}>
                    <h3>{props.title}</h3>
                    {!state.visible
                    ? <ul>
                      {state.items.map(
                        ( item:any ,idx:any ) => (
                          <Bars 
                            item={item} 
                            scale_idx={state.level_scale[props.title.toLowerCase()]} 
                            key={idx}
                          />
                        )
                      )}
                      </ul>
                    : <UpdateScaleForm 
                        add_scale={add_scale}
                        update_scale={update_scale}
                        styleName={props.styleName}
                        data={state.data}
                        table={props.title}
                        handleChange={this.handleChange.bind(this, update_scale)}
                        updateState={this.updateState}
                        toggleEdit={this.toggleEdit}
                        scale_idx={state.level_scale[props.title.toLowerCase()]} 
                        ref_id={props.ref_id}
                      />
                    }
                    {!state.visible
                    ? <div className='buttons'>
                        <button type="button" text={`Edit ${props.title}`} onClick={this.toggleEdit}>
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