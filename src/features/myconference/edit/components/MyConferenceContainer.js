import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import MyConferenceHeader from 'features/myconference/list/components/MyConferenceHeader'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import MyConference from 'features/myconference/edit/components/MyConference'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router'
import { useHistory } from 'react-router-dom'
import { MY_CONFERENCE_QUERY } from 'features/myconference/edit/queries/ConferenceQueries'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { useMutation } from '@apollo/client'
import { UPDATE_CONFERENCE } from 'features/conference/gql/mutations/UpdateConference'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useError } from 'hooks/errorHandling'
import { useEmail } from 'hooks/useEmail'

const MyConferenceContainer = () => {
  const { t } = useTranslation()
  const [, setHeader] = useHeader()
  const [conference, dispatch] = useReducer(reducer, initialConference)
  const match = useRouteMatch()
  const conferenceId = match.params.id
  const isNew = conferenceId === 'new'
  const addToast = useToast()
  const history = useHistory()
  const showError = useError()
  const [email] = useEmail()
  const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
      onCompleted: result => {
          addToast(t('Conferences.SavingSucceeded'), 'success')
          if (isNew) {
              history.push(`/myConferences/${result?.saveConference?.id}`)
          }
          result?.saveConference && dispatch({ type: "resetConference", payload: result?.saveConference })
      },
      onError: showError
  })
  const handleSave = useCallback(() => {
      const { id, name, startDate, endDate, deletedSpeakers, type, location, category, speakers } = conference
      const { city, county, country, ...locationData } = location
      const input = {
          id,
          name,
          startDate,
          endDate,
          organizerEmail: email,
          speakers,
          deletedSpeakers,
          type,
          category,
          location: {
              ...locationData,
              cityId: city.id,
              countyId: county.id,
              countryId: country.id
          }
      }
      updateConference({ variables: { input } })
  }, [conference, email, updateConference])
  const { data, loading: loadingConference } = useQueryWithErrorHandling(MY_CONFERENCE_QUERY,
      {
          variables: {
              id: conferenceId,
              isNew
          },
          onCompleted: (result) => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
      }
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setHeader(null), [])
  useEffect(() => {
      setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} onClick={handleSave} />} />)
  }, [conference.name, handleSave, setHeader, t])
  if (loadingConference || saving) {
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
export default MyConferenceContainer;