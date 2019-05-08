import { Store, Reducer } from 'redux';
import { AWSAppSyncClient, OfflineCallback } from './client';
import { NormalizedCacheObject, IdGetter } from 'apollo-cache-inmemory';
import { NetInfo, NetworkCallback } from '@redux-offline/redux-offline/lib/types';
declare const newStore: <TCacheShape extends NormalizedCacheObject>(clientGetter: () => AWSAppSyncClient<TCacheShape>, persistCallback: () => any, dataIdFromObject: (obj: any) => string, storage: any, callback?: OfflineCallback) => Store<any>;
export declare type OfflineEffectConfig = {
    enqueueAction: string;
    effect?: Function;
    discard?: Function;
    retry?: Function;
    reducer?: (dataIdFromObject: IdGetter) => Reducer<any>;
};
export declare type OfflineStatusChangeCallbackCreator = (callback: NetworkCallback) => void;
export declare type OfflineStatusChangeCallback = (result: {
    online: boolean;
    netInfo?: NetInfo;
}) => void;
export { newStore as createStore };
