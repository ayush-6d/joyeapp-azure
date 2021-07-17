import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

export interface IProtectedRoutImplImplProps {
    isLoggedIn?: boolean;
    path: string;
    component: React.ComponentClass;
    exact?: boolean;
    pathName?: string;
}

class ProtectedRoutImpl extends React.PureComponent<IProtectedRoutImplImplProps, {}> {

    render() {
        const { path, component, isLoggedIn, exact, pathName } = this.props;
        console.log('propd', this.props)
        return (
            <div style={{ height: '100%' }} >
                {isLoggedIn ? <Route exact={exact || false} path={path} component={component} /> :
                    <Redirect to="/login" />}
            </div>
        );
    }
}
export function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.login.get('isLoggedIn'),
        pathName: ownProps.location ? ownProps.location.pathname : ''
    };
}
export const ProtectedRoute = connect<{}, {}, IProtectedRoutImplImplProps>(mapStateToProps)(ProtectedRoutImpl as any);
