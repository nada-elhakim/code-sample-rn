import React from 'react';
import CustomIcon from '../../services/CustomIcon/CustomIcon';

export default class UseChainIcon extends React.Component {
    render() {
        const Icon = CustomIcon();
        return (
            <Icon {...this.props}/>
        );
    }
}