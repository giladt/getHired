import React from 'react';
import { faUserAstronaut, faPaintBrush, faAddressBook, faScroll } from '@fortawesome/free-solid-svg-icons';

// Components
import Content from './Content/content.jsx';
import Nav from './Nav/nav.jsx';
import Picture from './Picture/picture.jsx';

import Profile from '../../Profile/profile.jsx';
import Contact from '../../Contacts/contact_details.jsx';
import Portfolio from '../../Portfolio/portfolio.jsx';
import Timeline from '../../Timeline/timeline.jsx';

export default (params) => {
  let page= params.page;
  let user = params.user;
  let item = params.item;
  let google = params.google;
  
  let { Skills, Languages} = item;

  let routes = [
    {profile: <Profile item={item} employer={params.employer} />},
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
      <Nav user={user} page={page} employer={params.employer} routes={routes} icons={icons} />

      <Picture user={user} item={item} />
      <Content user={user} page={page} routes={routes} item={item} google={google} />
    </main>
  );
};
