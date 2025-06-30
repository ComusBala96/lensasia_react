import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { store } from '@orian/functions';
// import { Provider } from 'react-redux';

import ShowAdditionalImages from './images/ShowAdditionalImages';
import ShowAdditionalFiles from './files/ShowAdditionalFiles';

const additionalImages = document.getElementById('display_additional_images');
if (additionalImages) {
    createRoot(additionalImages).render(
        <ShowAdditionalImages />
    );
}
const additionalFiles = document.getElementById('display_additional_files');
if (additionalFiles) {
    createRoot(additionalFiles).render(
        <ShowAdditionalFiles />
    );
}
