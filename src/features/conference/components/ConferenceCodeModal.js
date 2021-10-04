import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import qrCode from 'assets/img/qrCode.png'

const ConferenceCodeModal = ({ code }) => {
  const { t } = useTranslation()
  return (
    <Grid container>
      <Grid item lg={12}>
        <img src={qrCode} alt='QR' style={{ maxHeight: '400px' }} />
      </Grid>
      <Grid item lg={12}>
        <Typography variant='subtitle1'>{t('Conferences.QRCodeMessage', { code })}</Typography>
      </Grid>
    </Grid>
  )
}
ConferenceCodeModal.propTypes = {
  code: PropTypes.string
}

export default ConferenceCodeModal
