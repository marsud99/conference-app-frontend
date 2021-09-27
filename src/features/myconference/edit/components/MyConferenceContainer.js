import { useHeader } from 'providers/AreasProvider'
import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import MyConferenceHeader from 'features/myconference/list/components/MyConferenceHeader'
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import { counties, types,categories,countries,cities } from 'utils/mocks/conferenceDictionaries'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import MyConference from 'features/myconference/edit/components/MyConference'
import { reducer, initialConference } from '../conferenceState'
import { conference as serverConference } from 'utils/mocks/myConference';
import { useRouteMatch } from 'react-router'


const MyConferenceContainer = () => {
    const {t} = useTranslation()
    const [,setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch();
    const conferenceId = match.params.id;
    const isNew = conferenceId === 'new';
    useEffect(() => {
        if (!isNew) {
            dispatch({ type: 'resetData', payload: serverConference })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setHeader(null),[]) 
    useEffect(()=> {setHeader(<MyConferenceHeader title={conference.name} actions ={<SaveButton title = {t('General.Buttons.Save')}/>}/>)},
    [conference.name, setHeader, t])
    const {loading,data} = {loading: false, data: {
        typeList: types,
        categoryList: categories,
        countryList: countries,
        countyList: counties,
        cityList: cities
    }}
    if (loading) {
        return <LoadingFakeText lines={10} />
    }
    return <MyConference
    conference={conference}
    dispatch={dispatch}
    types={data?.typeList}
    categories={data?.categoryList}
    countries={data?.countryList}
    counties={data?.countyList}
    cities={data?.cityList}
/>
}

export default MyConferenceContainer