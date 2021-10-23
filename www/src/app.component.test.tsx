import React from 'react';
import { mount } from '@cypress/react';
import { AppComponent } from './app.component';

it('renders app component', () => {
  mount(<AppComponent />);
});
