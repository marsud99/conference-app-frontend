import React from 'react'
import attendeeStatus from 'constants/attendeeStatus'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography,Grid } from '@material-ui/core'
import Button from '@bit/totalsoft_oss.react-mui.button'

const MyConferenceContent = (props) =>{
    
    const {conference} = props
    const {status,startDate,endDate,type,category} = conference
    const {t} = useTranslation()
    const noStatusSet = t('Conferences.StatusNotSet')
    const showJoin = status.id === attendeeStatus.Attended
    const showWithdraw = status.id === attendeeStatus.Attended || status.id === attendeeStatus.Joined
    const showAttend = status.id === attendeeStatus.Withdrawn
    const startDateFormatted = t('DATE_FORMAT',{date: {value:startDate,format:'DD-MM-YYYY HH:mm'}})
    const endDateFormatted = t('DATE_FORMAT',{date: {value:endDate,format:'DD-MM-YYYY HH:mm'}})

return (
<Grid container>
    {/* <Grid item>
        <Typography variant='subtitle1' color= 'error'> 
        {status?.name || noStatusSet}
        </Typography>
    </Grid> */}
    <Grid item xs = {12}>
        <Typography>{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
    </Grid>
    <Grid item xs = {12}>
        <Typography> {`${type?.name}, ${category?.name}`}</Typography>
    </Grid>
    <Grid container spacing = {2}>
    <Grid item xs = {12}> 
    <Button right size='sm' color='danger'>{t('MyConferences.Delete')}</Button>
    <Button right size='sm' color='info'>{t('MyConferences.Edit')}</Button>
    </Grid>
</Grid>
</Grid>

)
    
}

MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired
}
export default MyConferenceContent