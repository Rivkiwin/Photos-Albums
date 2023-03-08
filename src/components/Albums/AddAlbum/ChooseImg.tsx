import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage';
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Form, ProgressBar } from 'react-bootstrap'
import { storage } from '../../../services/config/fireBase';
import { useAuth } from '../../AuthProvider';
import { useService } from '../../ServiceProvider';

const ChooseImg = forwardRef((props: any, ref) => {
    // const [uploadCnt, setCnt] = useState(0);
    const [photos, setPhotos] = useState<any[]>([]);
    const [progress, setProgress] = useState<any>(0);
    const {setLoading} = useAuth();
    const [showProgress, setShowProgress] = useState<any>(false);


    const { photoService } = useService();

    const onSelectImage = async (e: any) => {
        let images = Array.from(e.target.files);
        setPhotos(images)
    }


    useImperativeHandle(ref, () => ({
        uploadPhotos(albumId: string) {
          setLoading(true);
            let cnt = 0;
            const urls = Promise.all(photos.map(async photo => {
                const _storageRef = storageRef(storage, `/photo/${photo.name}`);
                const uploadTask = uploadBytesResumable(_storageRef, photo);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {

                        // update progress
                        const _progress = (snapshot.bytesTransferred / snapshot.totalBytes) / photos.length * 100;
                        setProgress(progress + _progress);
                    },
                    error => console.log(error.code),
                );
                await uploadTask;
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                photoService.create({ url, albumId, title: '' }).then(res => {
                    // setCnt(cnt + 1);
                    cnt++;
                })
            }))
            urls.then(res => {
                props.triggerReload(true);
                setLoading(false);
            })
        }
    }));
    return (
        <>
            {showProgress && <ProgressBar now={progress} label={`${progress}%`} className='mt-5' />}
            <Form.Group controlId="formFile" className="mb-3 mt-3">
                <Form.Label>Choose Photos</Form.Label>
                <input type='file'
                    multiple
                    id='upload'
                    accept="image/*"
                    className='form-control-sm form-control'
                    onClick={()=> console.log('click')}
                    onChange={onSelectImage} />
            </Form.Group>
        </>
    )
})

export default ChooseImg