import React from 'react'

import IcomoonReact from "icomoon-react"
import iconSet from "../../assets/icons/selection.json"

const Icon = ({size=20, ...props}) => {
    return <IcomoonReact className="icon" iconSet={iconSet} size={size} {...props} />
}

export default Icon
