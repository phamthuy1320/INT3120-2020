import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import Welcome from './components/Welcome';
import Menu from './components/Menu';
import AddWord from './components/AddWord';
import ListWords from './components/ListWords';
import Tutorial from './components/Tutorial';
import TickWords from './components/TickWords';
import SearchWords from './components/SearchWords';

export default createAppContainer(createSwitchNavigator(
  {
     Welcome:Welcome,
     Menu: Menu,
     Add:AddWord,
     List:ListWords,
     Tutorial:Tutorial,
     Tick:TickWords,
     Search:SearchWords,
  },
  {
    initialRouteName: 'Menu',
  }
  ));
