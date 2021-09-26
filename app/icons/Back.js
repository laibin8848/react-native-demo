import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const BackIcon = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}) => {
  return (
    <Svg style={{marginRight: 10}} width={size} height={size} fill={fill} viewBox="0 0 1024 1024">
      <Path fill={fill} d="M947.4 864C893.2 697.7 736.2 578.9 551 575.5c-23.1-0.4-44.9 0.1-65.6 1.5v164.3c0.1 0.5 0.2 1 0.2 1.5 0 4-3.3 7.3-7.3 7.3-2.7 0-5-1.4-6.2-3.5v0.7L68.8 465.4h2.1c-4 0-7.3-3.3-7.3-7.3 0-2.9 1.7-5.4 4.1-6.6L472 169v0.7c1.3-2.1 3.6-3.5 6.2-3.5 4 0 7.3 3.3 7.3 7.3 0 0.5-0.1 1-0.2 1.5v159.4c18.5-0.9 37.9-1.2 58.3-0.8 230.1 3.9 416.7 196.9 416.7 427.1 0.1 35.5-4.5 70.2-12.9 103.3z m-462-704.4v0.2h-0.4l0.4-0.2z m0 596.9l-0.3-0.2h0.3v0.2z" />
    </Svg>
  )
}
