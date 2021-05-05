import * as React from "react"
import Svg, { SvgProps, Defs, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function AddButton(props: SvgProps) {
    return (
        <Svg height={52} width={52} viewBox="0 1 125 125" {...props}>
            <Circle cx={63.242} cy={63.242} r={59.08} stroke="#00FF80" strokeWidth="6.5" fill="none" />
            <Path d="M63.242 40.839v44.806M85.645 63.242H40.839" stroke="#00FF80" strokeWidth="6.5" strokeLinecap="round" />
        </Svg>
    )
}

export default AddButton