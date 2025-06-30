// import { BrowserRouter } from 'react-router-dom';
// import { store } from '@orian/functions';
// import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import ShowAds from './ads/ShowAds';

const observer = new MutationObserver(() => {
    const ad1 = document.getElementById('ad1');
    const ad2 = document.getElementById('ad2');

    if (ad1 || ad2) {
        observer.disconnect();
        if (ad1){
            createRoot(ad1).render(<ShowAds index='1' delay='5000' />);
        }
        if (ad2) {
            createRoot(ad2).render(<ShowAds index='0' delay='6000'/>);            
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});