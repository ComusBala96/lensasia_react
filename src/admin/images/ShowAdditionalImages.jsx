import { createImageUrl, domain_url } from '@orians/utils';
import { useState, useCallback, useEffect } from 'react';

export default function ShowAdditionalImages() {
    const [images, setImages] = useState([]);
    const additional_images = document.getElementById('additional_images');
    const display_additional_images = document.getElementById('display_additional_images');
    const handleDisplayAdditionalImages = useCallback((e) => {
        const files = [...e.target.files];
        if (files.length > 0) {
            setImages((image) => [
                ...files.map((file) => Object.assign({ url: createImageUrl(file), alt: file.name }))
            ]);
        } else {
            setImages([]);
            additional_images.value = '';
        }
    }, [additional_images]);

    const handleCloseAdditionalImage = useCallback((imageName) => {
        setImages((image) => image.filter((image) => image.alt !== imageName));
        const dt = new DataTransfer();
        const currentFiles = Array.from(additional_images.files);
        currentFiles.forEach((file) => {
            if (file.name !== imageName) {
                dt.items.add(file);
            }
        });
        additional_images.files = dt.files;
        if (images.length <= 1) {
            additional_images.value = '';
        }

    }, [additional_images, images]);

    useEffect(() => {
        setImages([]);
        additional_images.value = '';
        const img = JSON.parse(display_additional_images.getAttribute('data-images')) ?? [];
        const path = display_additional_images.getAttribute('data-path') ?? '';
        console.log(img);

        if (img.length > 0) {
            setImages((image) => [
                ...img.map((file) => Object.assign({ url: domain_url + path + file.name + file.size_sm + file.ext, alt: file.name + file.size_sm + file.ext }))
            ]);
        }
    }, [additional_images, display_additional_images]);

    useEffect(() => {
        additional_images.addEventListener('change', (e) => handleDisplayAdditionalImages(e));
        return () => { removeEventListener('change', (e) => handleDisplayAdditionalImages(e)); };
    }, [additional_images, handleDisplayAdditionalImages]);
    return (
        <>
            {
                images?.length > 0 &&
                <div className="mx-10 my-2 flex flex-col gap-2">
                    {
                        images.map((image, i) => (
                            <div key={i} className="relative">
                                <div className="relative pb-[65%]">
                                    <img src={image.url} alt={image.alt} className="absolute h-full w-full object-cover" />
                                </div>
                                <button type="button" onClick={() => handleCloseAdditionalImage(image.alt)} className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-white hover:bg-red-700"><i className="fa fa-close"></i></button>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    );
}
