import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conference/components/ConferenceFilters'
//import conferences from 'utils/mocks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from 'features/conference/gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'

function ConferenceListContainer() {
  const [filters, setFilters] = useState(generateDefaultFilters())
  const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
  const [email] = useEmail()
  const [, setFooter] = useFooter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => setFooter(null), [])
  const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
    variables: { pager: extractPager(pager), filters, email },
    onCompleted: result => {
      const totalCount = result?.conferenceList.pagination?.totalCount
      setPager(state => ({ ...state, totalCount }))
    }
  })
  const handleRowsPerPageChange = useCallback(pageSize => {
    setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
  }, [])
  const handlePageChange = useCallback(page => {
    setPager(state => ({ ...state, page }))
  }, [])
  useEffect(() => {
    setFooter(
      <Pagination
        totalCount={pager.totalCount}
        page={pager.page}
        pageSize={pager.pageSize}
        rowsPerPageOptions={[3, 6, 12, 24, 100]}
        onRowsPerPageChange={handleRowsPerPageChange}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />
    )
  }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

  const handleApplyFilters = useCallback(value => {
    setFilters(value)
  }, [])
  if (loading && !data) {
    return <LoadingFakeText lines={10} />
  }

  return (
    <>
      <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <ConferenceList conferences={data?.conferenceList?.values} />
    </>
  )
}
export default ConferenceListContainer
