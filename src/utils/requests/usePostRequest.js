import axios from '../axios/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { storeData, storeErrors } from '@orians/lensasia_redux/slices/dataSlice';
import { setLoading } from '@orians/lensasia_redux/slices/stateSlice';
import { local } from '@orians/utils';

export default usePostRequest = () => {
    const dispatch = useDispatch();
    const { data, errors } = useSelector((store) => store.data);
    const handlePostRequest = (op) => {
        const { url = '', body = {} } = op;
        try {
            dispatch(setLoading(true));
            axios
                .post(url, body)
                .then((res) => {
                    if (local) {
                        console.log('res', res.data);                        
                    }
                    if (res.data.status == 200) {
                        dispatch(storeData(res.data));
                    }
                    if (res.data.status == 422) {
                        dispatch(storeErrors(res.data.errors));
                    }
                })
                .finally(() => {
                    dispatch(setLoading(false));
                })
                .catch((err) => {
                    if(local){
                        console.log('err', err);
                    }
                });
        } catch (error) {
            if(local){
                console.log('error', error);
            }
        }
    };
    return { handlePostRequest, data, errors };
};
