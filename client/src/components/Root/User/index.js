import React from 'react';
import { faUserAstronaut, faPaintBrush, faAddressBook, faScroll } from '@fortawesome/free-solid-svg-icons';

// Components
import Content from './Content';
import Nav from './Nav';
import Picture from './Picture';

import Profile from '../../Profile';
import Contact from '../../Contacts';
import Portfolio from '../../Portfolio';
import Timeline from '../../Timeline';

export default (params) => {

  let page= params.page;
  let user = params.user;
  let item = params.item;
  let google = params.google;
  
  let { Skills, Languages} = item;

  let routes = [
    {profile: <Profile item={item} />},
    {timeline: <Timeline item={item} />},
    {portfolio: <Portfolio item={{Skills,Languages}} />},
    {contact: <Contact item={item} google={google} />}
  ];

  let icons = {
    profile: faUserAstronaut,
    timeline: faScroll,
    portfolio: faPaintBrush,
    contact: faAddressBook,
  }

  return (
    <main>
      <Nav user={user} page={page} routes={routes} icons={icons} />

      <Picture user={user} item={item} />
      <Content user={user} page={page} routes={routes} item={item} google={google} />
    </main>
  );
};
