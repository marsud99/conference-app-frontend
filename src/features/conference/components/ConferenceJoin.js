import Typography from '@bit/totalsoft_oss.react-mui.typography'
import { Grid} from '@material-ui/core'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import React from 'react'
import { USERS_LIST_QUERY } from 'features/conference/gql/queries/UsersListQuery'
import { MY_CONFERENCE_QUERY } from 'features/myconference/edit/queries/ConferenceQueries'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { useRouteMatch } from 'react-router'
import moment from 'moment'

const JoinedConference = () => {
  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  const { data, loading } = useQueryWithErrorHandling(
    USERS_LIST_QUERY,

    {
      variables: {
        id: conferenceId
      }
    }
  )
  const {data :conferenceData, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
    variables: {
      id: conferenceId,
      isNew
    }
  })
// const {conference} = conferenceData
  if (loading || loadingConference) {
    return <LoadingFakeText lines={10} />
  }
  return (<>
    <Grid container justifyContent>
      {data?.users?.map(element => (
        <Grid item xs={4} key={data.users.indexOf(element)}>
          <Typography>{element.attendeeEmail}</Typography>
        </Grid>
      ))}
    </Grid>

<Grid container justifyContent='center'>

  <Grid item xs={4} >
    <Typography>Organizer Email: {conferenceData?.conference?.organizerEmail}</Typography>
  </Grid>

</Grid>
    </>
  )
}

export default JoinedConference
