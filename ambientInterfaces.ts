declare interface Function {
    resource?: string;
}

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    fbAsyncInit: any;
    FB: {
        init: Function;
        Event: {
            subscribe: Function;
        };
        AppEvents: {
            logEvent: Function;
        };
        getLoginStatus: Function;
        api: Function;
    };
}

declare interface String {
    capitalize: Function;
    deCapitalize: Function;
}

declare interface Object {
    forEachObj: Function;
}
