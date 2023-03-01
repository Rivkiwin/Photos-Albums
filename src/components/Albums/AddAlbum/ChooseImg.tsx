import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

function ChooseImg({ setImages }: any) {

    const onSelectImage = async (e: any) => {
        let images = Array.from(e.target.files);
        setImages(images)
    }

    return (
        <>
            <Form.Group controlId="formFile" className="mb-3 mt-3">
                <Form.Label>Choose Photos</Form.Label>
                <input type='file'
                    multiple
                    accept="image/*"
                    className='form-control-sm form-control'
                    onChange={onSelectImage} />
            </Form.Group>
        </>
    )
}
export default ChooseImg