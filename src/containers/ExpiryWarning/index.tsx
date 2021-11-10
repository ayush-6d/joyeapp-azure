import React from 'react'
import { useHistory, useLocation } from 'react-router';
import { Logo, BasePage } from 'src/components'
import { Button } from 'src/components/FormComponents/Button';


const errors = {
    "default": [
        <p>Your 30 Days trail period is about to expire.</p>,
        <p style={{marginBottom: 20 }}>Please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a> to continue using Joye</p>
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
        const daysLeft = query.get('daysLeft');            
        setMessages([
            <p>Your 30 Days trail period is about to expire in {daysLeft} {Number(daysLeft) > 1 ? 'days' : 'day'}</p>,
            <p style={{marginBottom: 20 }}>Please write to us at <a href="mailto:connect@joye.ai" style={{ color: "#1E00A3" }}>connect@joye.ai</a> to continue using Joye</p>
        ])        
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
                            localStorage.setItem('warned', new Date().toString());
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
