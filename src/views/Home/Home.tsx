import { DarkModeRounded, LightModeRounded, SettingsBrightnessRounded } from '@mui/icons-material'
import { Box, Button, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AsyncButton, useMessageBox } from '../../components'
import { useStores } from '../../store'
import { useColorMode } from '../../theme'
import { sleep } from '../../utils'

const types = ['success', 'info', 'warning', 'error'] as const

export const Home = observer(function Home() {
  const { colorMode, setColorMode } = useColorMode()
  const { info, confirm, prompt } = useMessageBox()
  const { enqueueSnackbar } = useSnackbar()
  const { t, i18n } = useTranslation()
  const { timerStore } = useStores()

  useEffect(() => {
    const timer = setInterval(() => {
      timerStore.increase()
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [timerStore])

  const handleLanguageChange: ToggleButtonGroupProps['onChange'] = (event, value) => {
    if (value) {
      i18n.changeLanguage(value)
    }
  }

  const handleColorModeChange: ToggleButtonGroupProps['onChange'] = (event, value) => {
    if (value) {
      setColorMode(value)
    }
  }

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      <Box width={300}>
        <Typography mb={1} color="text.secondary">
          {t('common.language')}
        </Typography>
        <ToggleButtonGroup value={i18n.language} color="primary" exclusive fullWidth size="small" onChange={handleLanguageChange}>
          <ToggleButton value="zh_CN" disableRipple>
            <SettingsBrightnessRounded sx={{ fontSize: '1em', mr: 1 }} />
            中文
          </ToggleButton>
          <ToggleButton value="en_US" disableRipple>
            <LightModeRounded sx={{ fontSize: '1em', mr: 1 }} />
            English
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box width={300}>
        <Typography mb={1} color="text.secondary">
          {t('common.colorMode')}
        </Typography>
        <ToggleButtonGroup value={colorMode} color="primary" exclusive fullWidth size="small" onChange={handleColorModeChange}>
          <ToggleButton value="system" disableRipple>
            <SettingsBrightnessRounded sx={{ fontSize: '1em', mr: 1 }} />
            {t('colorMode.system')}
          </ToggleButton>
          <ToggleButton value="light" disableRipple>
            <LightModeRounded sx={{ fontSize: '1em', mr: 1 }} />
            {t('colorMode.light')}
          </ToggleButton>
          <ToggleButton value="dark" disableRipple>
            <DarkModeRounded sx={{ fontSize: '1em', mr: 1 }} />
            {t('colorMode.dark')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        <Typography variant="h6">Message Box</Typography>
        <Typography my={1}>Type</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              info({
                content: t('info.content'),
                onConfirm: () => sleep(1000)
              })
            }>
            Default
          </Button>
          {types.map(type => (
            <Button
              key={type}
              variant="contained"
              color={type}
              disableElevation
              onClick={() =>
                info({
                  type,
                  title: t('dialog.title.warning'),
                  content: t('info.content'),
                  onConfirm: () => sleep(1000)
                })
              }>
              {type}
            </Button>
          ))}
        </Box>
        <Typography my={1}>Confirm</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={() =>
              confirm({
                type: 'warning',
                title: t('dialog.title.warning'),
                content: t('confirm.content'),
                confirmButtonText: t('confirm.delete'),
                confirmButtonLoadingText: t('confirm.deleting'),
                onConfirm: () => sleep(1000)
              })
            }>
            Confirm
          </Button>
        </Box>
        <Typography my={1}>Prompt</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              prompt({
                minWidth: 500,
                title: t('dialog.title.tips'),
                inputLabel: 'Email',
                inputType: 'email',
                inputPlaceholder: t('prompt.content'),
                confirmButtonLoadingText: t('confirm.deleting'),
                validate(value) {
                  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(value)
                    ? undefined
                    : (t('prompt.error') as string)
                },
                async onConfirm(value) {
                  await sleep(1000)
                  enqueueSnackbar(value, { variant: 'info' })
                }
              })
            }>
            Prompt
          </Button>
        </Box>
        <Typography my={1}>Async Button</Typography>
        <Box display="flex" gap={2}>
          <AsyncButton variant="contained" disableElevation onClick={() => sleep(1000)}>
            Click
          </AsyncButton>
        </Box>
      </Box>
      <Box height={2000} width="100%" textAlign="center">
        <Typography>{timerStore.seconds}</Typography>
      </Box>
    </Box>
  )
})

export default Home
