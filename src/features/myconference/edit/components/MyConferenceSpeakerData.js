import React from 'react'
import PropTypes from 'prop-types'
import {Tr,Td} from 'react-super-responsive-table'
import tableStyles from 'assets/jss/components/tableStyle'
import { Checkbox, makeStyles } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DeleteButton from '@bit/totalsoft_oss.react-mui.delete-button'
import { useTranslation } from 'react-i18next'

const useStyles=makeStyles(tableStyles)

const MyConferenceSpeakerData = (props) =>{
    const {speaker,dispatch,index} = props
    const {t} = useTranslation()
    const classes = useStyles()


  return( <Tr>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><CustomTextField fullWidth/></Td>
    <Td className={classes.tableContent}><Checkbox color = 'secondary'/></Td>
    <Td className={classes.tableContent}><DeleteButton size='small' title={t('General.Buttons.DeleteSpeaker')} />
</Td>

    </Tr>)
}

MyConferenceSpeakerData.propTypes = {
    speaker:PropTypes.object,
    dispatch:PropTypes.func,
    index:PropTypes.number
}
export default MyConferenceSpeakerData