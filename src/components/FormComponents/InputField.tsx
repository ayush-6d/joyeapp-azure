import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { baseBlack } from '../../constants/colors';

export interface IInputFieldProps {
  label: string;
  type: string;
  onChange?: (e) => void;
  validateWith?: (e) => void;
  onBlur?: (Function) => void;
  name?: string;
  maxLength?: number;
  className?: string;
  value?: string;
}

export class InputField extends React.PureComponent<IInputFieldProps, {}> {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.validateWith) {
      this.props.validateWith(e);
    }
  }

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: { main: baseBlack }
      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          required
          label={this.props.label}
          InputLabelProps={{
            style: {
              fontSize: '16px',
              paddingBottom: '5px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
              color: '#cccccc',
              fontFamily: 'Metropolis-Regular'
            }
          }}
          style={{ width: 300 }}
          InputProps={{
            style: {
              fontSize: '13px',
              color: baseBlack,
              fontFamily: 'Metropolis-Regular'
            }
          }}
          inputProps={{
            maxLength: this.props.maxLength
          }}
          type={this.props.type}
          margin="normal"
          value={this.props.value}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          className={this.props.className}
          name={this.props.name}
        />
      </MuiThemeProvider>
    );
  }
}
