import {Dimensions} from 'react-native';

export default {
    // Window
    windowHeight: Dimensions.get('window').height,
    windowWidth: Dimensions.get('window').width,

    // General
    defaultMargin: 16,
    defaultPadding: 16,

    // Button
    buttonHorizontalPadding: 20,
    buttonBorderRadius: 8,
    buttonHeight: 50,
    buttonSmallHeight: 40,

    // Input

    // Item
    itemPaddingVertical: 18,
    itemPaddingHorizontal: 18,
    itemBorderWidth: 1,
    itemHeadingMarginBottom: 12,

    // Header
    headerHorizontalMargin: 18,

    // Badge
    badgeCircleRadius: 9,
    badgeRadius: 5,
    badgePadding: 3,
    badgePaddingHorizontal: 16,
    badgePaddingVertical: 3,

    // Banner
    bannerHeight: 200,

    // Thumbnail
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    thumbnailBorderRadius: 5
}