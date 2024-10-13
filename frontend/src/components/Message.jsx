import { Alert } from 'react-bootstrap'

import React from 'react'

const Message = ({variant, children}) => {
  return (
    <Alert variant={variant? variant : 'info'}> {children} </Alert>
  )
}
// Ce bude deprecated
// Message.defaultProps= {
//     variant: "info"
// };

export default Message