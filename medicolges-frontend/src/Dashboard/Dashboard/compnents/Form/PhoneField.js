import React from 'react';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledInput = styled(Input)`
  margin: 10px 0;
`;

const StyledFormHelperText = styled(FormHelperText)`
  ${props => props.theme.typography.body1}
`;

function PhoneField(props) {
  const { value, defaultCountry, onChange } = props;

  return (
    <React.Fragment>
      {/* Simple usage */}
      <ReactPhoneInput
        value={value}
        onChange={onChange} // passed function receives the phone value
        component={StyledInput}
      />

      {/* Configure more */}
      <ReactPhoneInput
        value={value}
        defaultCountry={defaultCountry || 'gb'}
        onChange={onChange}
        inputComponent={StyledInput}
        dropdownComponent={StyledFormHelperText}
      />
    </React.Fragment>
  );
}

export default PhoneField;