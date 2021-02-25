import React, {Component} from 'react';
import {
    View
} from "react-native";
import Input from "../../theme/components/Input/Input";

class InputField extends Component {
    render() {
        return (
            <View>
                {this.renderInput()}
            </View>
        );
    }

    renderInput(){
        const {
            input,
            placeholder,
            secureTextEntry,
            iconProps,
            style,
            meta,
            button,
            noBorder,
            label,
            keyboardType,
            multiline,
            numberOfLines,
            editable = true,
            meta: { pristine, error, touched},
            errorTextStyle,
            focusOnError
        } = this.props;

        let hasError= false, errorMessage;


        if((!pristine || touched) && error){
            hasError= true;
        }

        return(
            <Input {...input}
                   input={input}
                   multiline={multiline}
                   numberOfLines={numberOfLines}
                   label={label}
                   errorMessage={error}
                   button={button}
                   error={hasError}
                   style={style}
                   editable={editable}
                   iconProps={iconProps}
                   noBorder={noBorder}
                   placeholder={placeholder}
                   focusOnError={focusOnError}
                   keyboardType={keyboardType}
                   meta={meta}
                   errorTextStyle={errorTextStyle}
                   secureTextEntry={secureTextEntry}/>
        )
    }
}

export default InputField;
