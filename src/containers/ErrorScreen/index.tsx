import React from 'react'
import { useHistory, useLocation } from 'react-router';
import { Logo, BasePage } from 'src/components'
import { Button } from 'src/components/FormComponents/Button';


const errors = {
    "unknownAuthError": [
        <p>To sign into Joye, please use the same email as you have used to sign in to Teams.</p>,
        <p style={{marginBottom: 20 }}>If the issue still persists, please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
    "cancelledByUser": [
        <p>Joye requires basic profile permission to continue. Please allow the permissions. Check Privacy Policy for more details.</p>,
        <p style={{marginBottom: 20 }}>If the issue still persists, please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a></p>
    ],
    "invalid_grant": [
        <p>Access denied.</p>,
        <p style={{marginBottom: 20 }}>Please ask your organization admin to provide access or if you're the organization admin please <a href="https://login.microsoftonline.com/common/adminconsent?client_id=b21b4641-0dee-43e8-b37e-a4ba3f5637f8">click here</a> to provide consent.</p>
    ],
    "expired": [
        <p>Your 30 days free trial is over. We will love for you to continue with Joye's mental fitness habit.</p>,
        <p style={{marginBottom: 20 }}>Please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a> to extend your free trial.</p>,
        <p>Please also refer Joye to your HR leader and we can activate Joye for you and all your colleagues. More information at <a href='https://joye.ai/subscribe/'>https://joye.ai/subscribe/</a></p>
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
                <div className="text-container" style={{ maxWidth: 400, margin: 'auto'}}>
                    <div style={{ textAlign: 'center' }}>
                        <h3><b>Oops!</b></h3>
                        <h4 style={{marginBottom: 40 }}><b>Something went wrong</b></h4>
                        
                    </div>
                    <div style={{ textAlign: 'left', marginLeft: 30 }}>
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
