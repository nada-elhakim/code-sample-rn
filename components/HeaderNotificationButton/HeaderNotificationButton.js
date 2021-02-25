import React from 'react';
import Button from "../../theme/components/Button/Button";
import NavigationService from "../../navigation/NavigationService";
import UseChainIcon from "../UseChainIcon/UseChainIcon";


const HeaderNotificationButton = (props) => {
      const goToMessages = () => {
        NavigationService.navigate('Messages')
      };
      return(
          <Button onPress={goToMessages} transparent buttonStyle={{height: undefined}}>
              <UseChainIcon name="icon-message" size={24}/>
          </Button>
      )
};

export default HeaderNotificationButton;
