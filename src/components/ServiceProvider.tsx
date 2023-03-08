import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { AlbumService } from '../services/AlbumService';
import AuthService from '../services/AuthService';
import { auth } from '../services/config/fireBase';
import { PermissionsService } from '../services/permissionsService';
import { PhotoService } from '../services/PhotoService';

export function useService() {
    return useContext<valueType>(ServiceContext);
}

type valueType = {
    authService: AuthService,
    albumService: AlbumService,
    photoService: PhotoService,
    permissionsService: PermissionsService;
}

const ServiceContext = createContext<valueType>({} as any);


export function ServiceProvider({ children }: any) {

    const [message, setMessage] = useState<{ message: String, type: 'success' | 'danger' } | null>()
    const [show, setShow] = useState(true);

    const authService = new AuthService(setMessage);
    const albumService = new AlbumService(setMessage);
    const photoService = new PhotoService(setMessage);
    const permissionsService = new PermissionsService(setMessage);

    function getAllUsers() {
   
    }


    useEffect(() => {
        setShow(true)
    }, [message])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
            if (user) {
                getAllUsers();
            }
        });
        return unsubscribe;
    }, [])

    const value = {
        authService,
        albumService,
        photoService,
        permissionsService,
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
                className='position-fixed'
                key={message.type}
                variant={message.type}
                onClose={() => setShow(false)}
                dismissible> {message.message} </Alert>}
        </ServiceContext.Provider >
    );

}
