import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import UseChainIcon from "../../components/UseChainIcon/UseChainIcon";

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
    customIcons[id] = customIcon;
};

export default type => {
    switch (type) {
        case 'MaterialIcons':
            return MaterialIcons;
        case 'Ionicons':
            return Ionicons;
        case 'FontAwesome':
            return FontAwesome;
        case 'SimpleLineIcons':
            return SimpleLineIcons;
        case 'AntDesign':
            return AntDesign;
        case 'usechain':
            return UseChainIcon;
        case 'Feather':
            return Feather;
        default:
            if (customIcons.hasOwnProperty(type)) {
                return customIcons[type];
            }
            return MaterialIcons;
    }
};