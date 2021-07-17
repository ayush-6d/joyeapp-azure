import * as React from 'react';
import { ImportLoader } from './ImportLoader';

export default function asyncComponent(importComponent, componentName) {
    class AsyncComponent extends React.Component<{}, { component: any }> {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
        }
        static defaultProps: {};
        async componentDidMount() {
            debugger
            const component = await importComponent();
            this.setState({
                component: component[componentName]
            });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : <ImportLoader />;
        }
    }

    return AsyncComponent;
}
