import {StyleSheet} from 'react-native';
import Colors from "../variables/Colors";

export default StyleSheet.create({
    actionButtonsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.white
    },
    actionButtonWrapper: {
        flex: 1,
        borderRadius: 0
    }
});