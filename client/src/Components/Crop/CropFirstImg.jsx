import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import React, { useContext, useRef, useState } from 'react'
import { FileContext } from '../contexts/fileContext'
import axios from '../../Global/API/axios'

const CropFirstImg = () => {
    const inputFile = useRef(null);
    const { 
        firstCrop,
        setFirstCrop,
        firstFile,
        setFirstFile,
        checkMode,
        setCheckMode,
        magnitudeFirstURL,
        setMagnitudeFirstURL,
        phaseFirstURL,
        setphaseFirstURL,
        originalFirstURL,
        setOriginalFirstURL,
        setOriginalFirstImgId,
        originalFirstImgId,
        originalSecondImgId,
        secondCrop,
        magFirstCrop,
        phaseFirstCrop,
        magSecondCrop,
        phaseSecondCrop,
        } = useContext(FileContext);

    const handleFileFirstUpload = (e) => {
        setFirstFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("Img", e.target.files[0])
        axios.post('/img',
            formData
        ).then((response) => {
            setOriginalFirstURL(response.data.img_url)
            axios.get(`/combImg?imgId=${response.data.imgId}`
            ).then((response) => {
                setMagnitudeFirstURL(response.data.mag_img_url)
                setphaseFirstURL(response.data.phase_img_url)
                setOriginalFirstImgId(response.data.imgId)
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log(firstFile);
    console.log(firstCrop);

    const handleButtonClick = () => {
        inputFile.current.click();
    };

    const handleImgDelete = () => {
        setOriginalFirstURL(null)
        setFirstFile(undefined)
        inputFile.current.value = null
    }

    const handleSelectClick = () => {
        setCheckMode(!checkMode)
    }

    console.log(checkMode);

    return (
        <>
            <div>
                <button onClick={handleSelectClick}>
                    crop image 1
                </button>
                <button onClick={handleButtonClick}>
                    Upload image 1
                </button>
                <button onClick={handleImgDelete}>
                    delete image 1
                </button>
                <input
                    type='file'
                    id='file'
                    ref={inputFile}
                    style={{ display: 'none' }}
                    onChange={handleFileFirstUpload}
                />
                {checkMode === true ? (
                    <ReactCrop crop={firstCrop} onChange={(c, per) => setFirstCrop(per)}
                        onComplete={(px, percent) => {
                            axios.post('/select',
                            {
                                "original_First_Id" : originalFirstImgId,
                                "original_First_Crop" : firstCrop,
                                "original_Second_Id" : originalSecondImgId,
                                "original_Second_Crop" : secondCrop,
                                "mag_First_Id" : `mag${originalFirstImgId}`,
                                "mag_First_Crop" : magFirstCrop,
                                "phase_First_Id" : `phase${originalFirstImgId}`,
                                "phase_First_Crop" : phaseFirstCrop,
                                "mag_Second_Id" : `mag${originalSecondImgId}`,
                                "mag_Second_Crop" : magSecondCrop,
                                "phase_Second_Id" : `phase${originalSecondImgId}`,
                                "phase_Second_Crop" : phaseSecondCrop,
                            }
                            ).then((response) => {
                                console.log(response)
                            }).catch((err) => {
                                console.log(err)
                            })
                        }}>
                        <img style={{ width: originalFirstURL !== null ? "17rem" : "0", height: originalFirstURL !== null? "17rem" : "0" }} src={originalFirstURL} />
                    </ReactCrop>
                ) :
                    <img style={{ width: firstFile !== undefined ? "17rem" : "0", height: firstFile !== undefined ? "17rem" : "0" }} src={originalFirstURL} />
                }

            </div>
        </>
    )
}

export default CropFirstImg


