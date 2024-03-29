import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

export default () => {
  return(
    <main>
      <section className='loading'>
        <span><FontAwesomeIcon  icon={faSpinner} spin size='1x'/>Just finishing this task, and we're ready to go...</span>
      </section>
    </main>
  )
}