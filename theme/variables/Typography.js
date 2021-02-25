import Colors from "./Colors";
import {Platform} from 'react-native';

export default {
    // Font family
    // baseFontFamily: 'ping-fang-sc-regular',
    // headingFontFamily: 'ping-fang-sc-medium',

    baseFontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
    headingFontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Roboto',


    // Font sizes 9,10,12,14,16,18, 20, 24, 36
    defaultFontSize: 14,
    itemHeadingFontSize: 16,

    // Colors
    defaultTextColor: '#838798',
    defaultHeadingColor: Colors.textDark,

    // Badge
    badgeFontSize: 10,
    badgeTextColor: Colors.white,

    // Note
    noteFontSize: 10,
    noteTextColor: Colors.textLight

}