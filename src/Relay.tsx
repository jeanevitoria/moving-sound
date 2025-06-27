import React, { useEffect } from 'react'; // Importe useEffect

const Relay = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            fetch(`http://localhost:8000/oauth/get-oauth-token/${sessionId}/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Falha ao buscar token do backend via relay.');
                    }
                    return response.json();
                })
                .then(tokenData => {
                    const channel = new BroadcastChannel('oauth_channel');
                
                    channel.postMessage({
                        type: 'oauth_success',
                        temp_session_id: sessionId,
                        access_token: tokenData.access_token
                    });
                                    
                    window.close();
                })                
                .catch(error => {
                    console.error("Erro no processo de relay OAuth:", error);
                })
                .finally(() => {
                    window.close();
                });
        } else {
            console.error("Nenhum session_id encontrado na URL da página relay.");
            window.close();
        }
    }, []); 

    return (
        <div>
            <p>Transferindo informações de autenticação...</p>
            <p>Por favor, aguarde...</p>
        </div>
    );
};

export default Relay;