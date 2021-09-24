import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from 'features/myconference/list/components/MyConferenceFilters'
import conferences from 'utils/mocks/attendeeList'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
function MyConferenceListContainer() {
    const [,setHeader] = useHeader()
    const {t} = useTranslation()
    const history = useHistory()
    
    const {data, loading} = {data: conferences, loading: false}
    const [filters, setFilters] = useState(generateDefaultFilters())
    const handleAddClick = useCallback(() => {
        history.push("myConferences/new")
    }, [history])
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])
    useEffect(()=>{
        //did mount
        return() =>{
            setHeader(null)
        }         //will unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        setHeader(<MyConferenceHeader title={t('NavBar.MyConferences')} actions = {<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick = {handleAddClick}/>}>
        </MyConferenceHeader>)
    },[])
    if (loading) {return <LoadingFakeText lines = {10}/>}



    return ( 
    <>
        <MyConferenceFilters filters = {filters} onApplyFilters = {handleApplyFilters}/>
        <MyConferenceList conferences={data}/>
        
    </>
    )
}
export default MyConferenceListContainer;