import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const SettingIcon = ({
  size = 30,
  fill = 'rgb(255, 255, 255)',
}) => {
  return (
    <Svg style={{marginRight: 10}} width={size} height={size} fill={fill} viewBox="0 0 1024 1024">
      <Path fill={fill} d="M372.134088 1004.846981a509.94041 509.94041 0 0 1-159.298198-76.821527l2.164315-103.514738a93.088793 93.088793 0 0 0-74.238313-93.088794l-101.536602-20.991523A509.428422 509.428422 0 0 1 0.011636 537.983409l82.243949-62.834935a93.088793 93.088793 0 0 0 26.507034-116.104998l-46.89348-92.390627A514.152678 514.152678 0 0 1 172.225904 128.415991l100.419536 25.133974a93.088793 93.088793 0 0 0 107.284834-51.664281l43.007023-94.252403a515.246472 515.246472 0 0 1 88.434354-7.610009c30.137497 0 59.669917 2.606486 88.411081 7.610009l43.007023 94.252403a93.088793 93.088793 0 0 0 107.284834 51.664281l100.396264-25.133974a514.152678 514.152678 0 0 1 110.356765 138.236858l-46.870208 92.390627a93.088793 93.088793 0 0 0 26.483762 116.104998l82.243949 62.834935a509.428422 509.428422 0 0 1-39.213654 172.44699l-101.51333 20.968251a93.088793 93.088793 0 0 0-74.238312 93.088793l2.141042 103.538011a509.94041 509.94041 0 0 1-159.298198 76.798255l-79.684007-66.279221a93.088793 93.088793 0 0 0-119.060567 0l-79.684007 66.302493zM511.348378 721.461421a209.449785 209.449785 0 1 0 0-418.89957 209.449785 209.449785 0 0 0 0 418.89957z" />
    </Svg>
  )
}
