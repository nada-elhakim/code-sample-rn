import {StyleSheet} from 'react-native';
import Typography from "../variables/Typography";
import Colors from "../variables/Colors";

export default StyleSheet.create({
    number: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    numberBig: {
       // color: Colors.primaryDark,
       fontSize: 40
    },
    badgeText: {
        fontSize: Typography.badgeFontSize,
        color: Typography.badgeTextColor
    },
    textClear: {
        color: Colors.white
    },
    textPrimary: {
        color: Colors.primaryDark
    },
    textDark: {
        color: Colors.textDark
    },
    textTransparent: {
        color: 'rgba(255,255,255,.5)'
    },
    textHighlight: {
        color: Colors.highlight
    }
});