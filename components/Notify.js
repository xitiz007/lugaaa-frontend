import { useContext } from 'react';
import { DataContext } from "../store/globalState";
import Snackbar from './Snackbar';
import {NOTIFY} from '../store/constants';

const Notify = () => 
{
    const {state, dispatch} = useContext(DataContext);
    const {notify} = state;
    const onCloseHandler = () => {
        dispatch({ type: NOTIFY, payload: {} });
    }

    return (
      <>
        {notify.success && (
          <Snackbar
            show={true}
            severity="success"
            message={notify.success}
            onClose={onCloseHandler}
          />
        )}
        {notify.error && (
          <Snackbar
            show={true}
            severity="error"
            message={notify.error}
            onClose={onCloseHandler}
          />
        )}
      </>
    );
}

export default Notify;