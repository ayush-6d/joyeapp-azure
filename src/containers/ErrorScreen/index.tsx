import React from 'react'
import { useHistory, useLocation } from 'react-router';
import { Logo, BasePage } from 'src/components'
import { Button } from 'src/components/FormComponents/Button';


const errors = {
    "unknownAuthError": [
        <p>To sign in to Joye, please use the same email as you have used to sign in to Teams.</p>,
        <p style={{marginBottom: 20 }}>If the issue still persists, please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
    "cancelledByUser": [
        <p>Joye requires basic profile permission to continue. Check Privacy Policy for more details.</p>,
        <p style={{marginBottom: 20 }}>If the issue still persists, please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
    "invalid_grant": [
        <p>Access denied.</p>,
        <p style={{marginBottom: 20 }}>Please ask your organization admin to provide access or if you're the organization admin please <a href="https://login.microsoftonline.com/common/adminconsent?client_id=b083d035-a374-45ea-911c-5ddf8569b0f5">click here</a> to provide consent.</p>
    ],
    "expired": [
        <p>Your 30 days trail period is over</p>,
        <p style={{marginBottom: 20 }}>Please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
    "default": [
        <p>Please try again.</p>,
        <p style={{marginBottom: 20 }}>If the issue still persists, please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ErrorPage() {
    const query = useQuery();
    const history = useHistory();
    const [messages, setMessages] = React.useState([]);
    React.useEffect(() => {
        const errorCode = query.get('errorCode');
        if (errorCode && errors[errorCode]) {
            setMessages(errors[errorCode]);
        } else {
            setMessages(errors["default"])
        }
    }, []);
    return (
        <div>
            <BasePage className="login-form home-screen">
                <Logo height="76px" width="76px" marginTop="72px" />
                <br />
                <div className="text-container">
                    <div style={{ textAlign: 'left', marginLeft: 30 }}>
                        <h3><b>Oops!</b></h3>
                        <h4 style={{marginBottom: 40 }}><b>Something went wrong</b></h4>
                        {messages && messages.map(message => (<>{message} <br /></>))}
                        
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                            history.push('/')
                        }}
                        marginBottom={'20px'}
                        fontWeight={600}
                        fontSize="16.67px"
                    >
                        Ok
                    </Button>
                </div>
            </BasePage>
        </div>
    )
}
