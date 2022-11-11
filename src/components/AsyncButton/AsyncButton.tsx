import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React, { useCallback, useState } from 'react'

export interface AsyncButtonProps extends ButtonProps {
  loadingIndicator?: React.ReactNode

  loadingIcon?: React.ReactNode
}

export const AsyncButton: React.FC<AsyncButtonProps> = ({ loadingIndicator, disabled, startIcon, loadingIcon, children, onClick, ...props }) => {
  const [loading, setLoading] = useState(false)

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async event => {
      setLoading(true)
      try {
        await Promise.resolve(onClick?.(event))
      } catch {
      } finally {
        setLoading(false)
      }
    },
    [onClick]
  )

  return (
    <Button {...props} disabled={loading || disabled} startIcon={loading ? loadingIcon : startIcon} onClick={handleButtonClick}>
      {loading ? loadingIndicator ?? children : children}
    </Button>
  )
}

AsyncButton.defaultProps = {
  loadingIcon: <CircularProgress color="inherit" size="1em" />
}
