import { useState, useCallback, useEffect } from 'react';

export default function ShowAdditionalFiles() {
    const [files, setFiles] = useState([]);

    const additional_files = document.getElementById('files');
    const display_additional_files = document.getElementById('display_additional_files');
    const handleDisplayAdditionalFiles = useCallback((e) => {
        const files = [...e.target.files];
        if (files.length > 0) {
            setFiles((file) => [
                ...files.map((file) => Object.assign({ name: file.name }))
            ]);
        } else {
            setFiles([]);
            additional_files.value = '';
        }
    }, [additional_files]);
    const handleCloseAdditionalFile = useCallback((fileName) => {
        setFiles((file) => file.filter((file) => file.name !== fileName));
        const dt = new DataTransfer();
        const currentFiles = Array.from(additional_files.files);
        currentFiles.forEach((file) => {
            if (file.name !== fileName) {
                dt.items.add(file);
            }
        });
        additional_files.files = dt.files;
        if (files.length <= 1) {
            additional_files.value = '';
        }
    }, [additional_files, files]);
    useEffect(() => {
        setFiles([]);
        additional_files.value='';
        const data = JSON.parse(display_additional_files.getAttribute('data-files')) ?? [];
        if (data.length > 0) {
            setFiles((file) => [
                ...data.map((file) => Object.assign({ name: file.name }))
            ]);
        }
    }, [additional_files, display_additional_files]);
    useEffect(() => {
        additional_files.addEventListener('change', (e) => handleDisplayAdditionalFiles(e));
        return () => { removeEventListener('change', (e) => handleDisplayAdditionalFiles(e)); };
    }, [additional_files, handleDisplayAdditionalFiles]);
    return (
        <>
            {
                files?.length > 0 &&
        <div className="p-2 flex flex-col gap-2">
            {
                files.map((file, i) => (
                    <div key={i} className="relative">
                        <p>{file.name}</p>
                        <button type="button" onClick={() => handleCloseAdditionalFile(file.name)} className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-white hover:bg-red-700"><i className="fa fa-close"></i></button>
                    </div>
                ))
            }
        </div>
            }
        </>
    );
}
