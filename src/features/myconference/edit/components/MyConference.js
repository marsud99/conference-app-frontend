import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Info, LocationOn, Face } from '@material-ui/icons'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import MyConferenceInfo from './MyConferenceInfo';
import MyConferenceLocation from './MyConferenceLocation';
import MyConferenceSpeakers from './MyConferenceSpeakers';
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
const MyConference = (props) => {
    const { types, categories, countries, counties, cities, conference,dispatch } = props
    const { t } = useTranslation()
    const {location,speakers} = conference
    const handleAddButton = useCallback(() => dispatch({ type: 'addSpeaker' }), [dispatch])

    

    return <>
        <IconCard
            icon={Info}
            title={t("Conference.Info")}
            content={
                <MyConferenceInfo
                    types={types}
                    categories={categories} conference={conference} dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={LocationOn}
            title={t("Conference.Location")}
            content={
                <MyConferenceLocation
                    countries={countries}
                    counties={counties}
                    cities={cities}
                    location={location}
                    dispatch={dispatch}
                />
            }
        />
        <IconCard
            icon={Face}
            title={
                <CardTitle
                    title={t("Conference.Speakers")}
                    actions={[<AddButton key='addButton' title={t("General.Buttons.AddSpeaker")} onClick = {handleAddButton}/>]}
                />
            }
            content={
                <MyConferenceSpeakers speakers = {speakers} dispatch = {dispatch}
                />
            }
        />
    </>
}

MyConference.propTypes={
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array,
    conference:PropTypes.object,
    dispatch:PropTypes.func
}


export default MyConference