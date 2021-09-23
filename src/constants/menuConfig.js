import React from 'react'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import EventIcon from '@material-ui/icons/Event'
const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu'},
  { icon: <EventIcon/>, text: 'NavBar.ConferenceList', path: '/conference', name:'ConferenceList'}
]

export default menuItems
