import * as React from 'react';
import { connect } from 'react-redux';

export interface IAlertProps {
    id: string;
    errorMsg?: string;
    alert?: any;
}

export class AlertImpl extends React.PureComponent<IAlertProps, {}> {
    constructor(props: IAlertProps) {
        super(props);
    }

    render() {
        const { alert, id, errorMsg } = this.props;
        if (alert) {
            return <span style={{ textAlign: 'center', color: '#ff6699', fontSize: '13px', marginBottom: '15px' }}>
                {alert.alertMsg || errorMsg}</span>;
        } else {
            return '';
        }
    }
}
export function mapStateToProps(state, ownProps) {
    return {
        alert: state.alert.get(ownProps.id)
    };
}
export const Alert = connect<{}, {}, IAlertProps>(mapStateToProps)(AlertImpl);
