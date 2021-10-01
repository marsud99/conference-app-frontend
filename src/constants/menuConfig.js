import React from 'react'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import EventIcon from '@material-ui/icons/Event'
import { EventNote} from '@material-ui/icons'
const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
  { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu'},
  { icon: <EventIcon/>, text: 'NavBar.Conferences', path: '/conference', name:'Conferences'},
  { icon: <EventNote/>, text: 'NavBar.MyConferences', path: '/myConference', name:'MyConferences'}
]

export default menuItems
