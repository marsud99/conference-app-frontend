import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer} from 'react'
import { useTranslation } from 'react-i18next'
import MyConferenceHeader from 'features/myconference/list/components/MyConferenceHeader'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import MyConference from 'features/myconference/edit/components/MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { MY_CONFERENCE_QUERY } from 'features/myconference/edit/queries/ConferenceQueries'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeader(null), [])
  useEffect(() => {
    setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
  }, [conference.name, setHeader, t])

  const { data, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY, {
    variables: {
      id: conferenceId,isNew
    },

    onCompleted: (result) =>result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
  })


  if (loadingConference) {
    return <LoadingFakeText lines={10} />
  }
  return (
    <MyConference
      conference={conference}
      dispatch={dispatch}
      types={data?.typeList}
      categories={data?.categoryList}
      countries={data?.countryList}
      counties={data?.countyList}
      cities={data?.cityList}
    />
  )
}

export default MyConferenceContainer
