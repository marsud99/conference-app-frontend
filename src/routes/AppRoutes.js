/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import CustomRoute from '../components/routing/CustomRoute'

import Welcome from 'features/welcome/Welcome'
import Settings from 'features/settings/Settings'
import { Forbidden, NotFound } from '@bit/totalsoft_oss.react-mui.kit.core'
import HelloWorld from 'features/helloWorld/HelloWorld'
import ConferenceListContainer from 'features/conference/components/ConferenceListContainer'
import MyConferenceListContainer from 'features/myconference/list/components/MyConferenceListContainer'
import { useEmail } from 'hooks/useEmail'
import MyConferenceContainer from 'features/myconference/edit/components/MyConferenceContainer'
import ConferenceJoin from 'features/conference/components/ConferenceJoin'

export default function AppRoutes() {
  const [email]=useEmail()
  if(!email){
    return (<Switch>
    <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
    <Redirect exact to='/welcome' />
  </Switch>)
  }
  return (
    <Switch>
      <CustomRoute isPrivate={false} exact path='/joinedConference/:id(\d+)' component={ConferenceJoin} />
      <CustomRoute isPrivate={false} exact path='/conference' component={ConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconference' component={MyConferenceListContainer} />
      <CustomRoute isPrivate={false} exact path='/myconferences/:id(new)' component={MyConferenceContainer} />
      <CustomRoute isPrivate={false} exact path='/myconferences/:id(\d+)' component={MyConferenceContainer} />

      <CustomRoute isPrivate={false} exact path='/welcome' component={Welcome} />
      <CustomRoute exact path='/settings' component={Settings} />
      <CustomRoute isPrivate={false} exact path="/helloWorld" component = {HelloWorld} />
      <Redirect exact from='/' to='/welcome' />
      <CustomRoute isPrivate={false} exact path='/forbidden' component={Forbidden} />
      <CustomRoute isPrivate={false} render={() => <NotFound title='PageNotFound'></NotFound>} />
    </Switch>
  )
} 




