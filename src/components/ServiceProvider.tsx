import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { AlbumService } from '../services/AlbumService';
import AuthService from '../services/AuthService';
export type { IServices };

interface IServices {
    services: {
        authService?: AuthService,
        albumService?: AlbumService
    }
}



export function useService() {
    return useContext<valueType>(ServiceContext);
}

type valueType = {
    authService: AuthService,
    albumService: AlbumService
}

const ServiceContext = createContext<valueType>({} as any);


export function ServiceProvider({ children }: any) {

    const [message, setMessage] = useState<{ message: String, type: 'success' | 'danger' } | null>()
    const [show, setShow] = useState(true);

    const authService = new AuthService(setMessage);
    const albumService = new AlbumService(setMessage);

    useEffect(() => {
        console.log(message);
        setShow(true)
    }, [message])

    const value = {
        authService,
        albumService
    }


    return (
        <ServiceContext.Provider value={value}>
            {children}
            {message && show && <Alert
                style={{
                    position: 'absolute',
                    bottom: '0',
                    width: ' 96%',
                    marginLeft: '2%'
                }}
                key={message.type}
                variant={message.type}
                onClose={() => setShow(false)}
                dismissible> {message.message} </Alert>}
        </ServiceContext.Provider >
    );

}
