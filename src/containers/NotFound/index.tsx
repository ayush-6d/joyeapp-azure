import './notfound.scss';
import * as React from 'react';
import { BasePage } from 'components/index';
import { withRouter } from 'react-router';

export interface INotFoundProps {
    history: {
        push: (path: string) => void;
    };
}
export interface INotFoundState {
}

class NotFoundImpl extends React.Component<INotFoundProps, INotFoundState> {
    constructor(props: INotFoundProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BasePage>
                <div className="margin-5 margin-top-5">
                    <div>404 Page not found.</div>
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <span
                            className="dashboard-link"
                            onClick={() => this.props.history.push(`/dashboard`)}
                        >
                            Back to Dashboard
                    </span>
                    </div>
                </div>
            </BasePage>
        );
    }
}

export const NotFound = withRouter(NotFoundImpl as any);
