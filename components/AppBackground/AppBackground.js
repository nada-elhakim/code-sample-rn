import React, { Component } from "react";
import BackgroundContainer from "../../theme/components/BackgroundContainer/BackgroundContainer";
import Images from "../../theme/variables/Images";


const AppBackground = (props) => {
    return (
        <BackgroundContainer source={Images.appBackground}>
            {props.children}
        </BackgroundContainer>
    );
};

export default AppBackground;



