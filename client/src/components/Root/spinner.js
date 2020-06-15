import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

export default (params) => {
  return(
    <main>
      <section className='loading'>
        <span><FontAwesomeIcon  icon={faSpinner} spin size='1x'/> Setting up...</span>
      </section>
    </main>
  )
}