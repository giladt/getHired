import React from 'react';
import { faUserAstronaut, faPaintBrush, faAddressBook, faScroll } from '@fortawesome/free-solid-svg-icons';

// Components
import Content from './Content/content';
import Nav from './Nav/nav';
import Picture from './Picture/picture';

import Profile from '../../Profile/profile';
import Contact from '../../Contacts/contact_details';
import Portfolio from '../../Portfolio/portfolio';
import Timeline from '../../Timeline/timeline';

export default (params:any) => {
  const page:any = params.page;
  const user:any = params.user;
  const employer:any = params.employer;
  const item:any = params.item;
  const google:any = params.google;
  
  const { Skills, Languages} = item;

  const routes:any = [
    {profile: (<Profile item={item} employer={employer} />)},
    {timeline: (<Timeline item={item} />)},
    {portfolio: (<Portfolio item={{Skills,Languages}} />)},
    {contact: (<Contact item={item} google={google} />)}
  ];

  const icons = {
    profile: faUserAstronaut,
    timeline: faScroll,
    portfolio: faPaintBrush,
    contact: faAddressBook,
  }

  return (
    <main>
      <Nav user={user} page={page} employer={employer} routes={routes} icons={icons} />

      <Picture user={user} item={item} />
      <Content user={user} page={page} routes={routes} />
    </main>
  );
};
