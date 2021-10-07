import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import imageModel from '../../models/Image.js'

const Image = ({image, className, ratio, ...props}) => {
    return (
        <div className={cn(`image ${className || ''}`, {
            'image--wide': ratio ==='wide',
            'image--square': ratio === 'square'
        })}>
            <figure>
                <picture>
                    <img src={image.url} alt={image.name} />
                </picture>
                {props.children}
            </figure>
        </div>
    )
}

Image.propTypes = {
    image: PropTypes.shape(imageModel),
    className: PropTypes.string,
    ratio: PropTypes.oneOf(["squared", "wide"]),
}

export default Image
