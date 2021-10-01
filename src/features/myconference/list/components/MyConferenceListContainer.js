import React, { useCallback, useEffect, useState } from 'react'
import MyConferenceFilters from 'features/myconference/list/components/MyConferenceFilters'
import MyConferenceList from './MyConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useFooter, useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from './MyConferenceHeader'
import { useTranslation } from 'react-i18next'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'
import { useHistory } from 'react-router'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
function MyConferenceListContainer() {
    const [,setHeader] = useHeader()
    const [,setFooter] = useFooter()
    const {t} = useTranslation()
    const history = useHistory()
    const [email] = useEmail()
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [pager, setPager] = useState({totalCount:0,page:0, pageSize : 3})
    const {data, loading,refetch} = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY,{
        variables:{pager:extractPager(pager), filters:{...filters,organizerEmail:email}, email},
        onCompleted:(result)=>{
            const totalCount =  result?.conferenceList.pagination?.totalCount
            setPager(state=>({...state,totalCount}))
         }
    })
    
    const handleAddClick = useCallback(() => {
        history.push("myConferences/new")
    }, [history])
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])
    const handlePageChange = useCallback((page)=>{
        setPager(state=>({...state,page}))

    },[])
    const handleRowsPerPageChange = useCallback((pageSize)=>{
        setPager((state)=>({...state,pageSize: parseInt(pageSize)}))
    },[])
    useEffect(()=>{
        //did mount
        return() =>{
            setHeader(null)
            setFooter(null)
        }         //will unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        setHeader(<MyConferenceHeader title={t('NavBar.MyConferences')} actions = {<AddButton key='addButton' title={t("General.Buttons.AddConference")} onClick = {handleAddClick}/>}>
        </MyConferenceHeader>)
    },[handleAddClick,setHeader,t])

    useEffect(()=>{
        setFooter(<Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3,6,12,24,100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange = {handlePageChange}
        onRefresh={refetch}
        />)
    },[handlePageChange,handleRowsPerPageChange,pager.page,pager.pageSize,pager.totalCount,refetch,setFooter])
    if (loading || !data) {
        return <LoadingFakeText lines = {10}/>
    }



    return ( 
    <>
        <MyConferenceFilters filters = {filters} onApplyFilters = {handleApplyFilters}/>
        <MyConferenceList conferences={data?.conferenceList?.values}/>
        
    </>
    )
}
export default MyConferenceListContainer;