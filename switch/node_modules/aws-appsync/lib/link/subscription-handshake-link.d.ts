/// <reference types="zen-observable" />
/*!
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *     http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
import { ApolloLink, Observable, Operation, FetchResult } from "apollo-link";
declare type MqttConnectionInfo = {
    client: string;
    url: string;
    topics: string[];
};
export declare const CONTROL_EVENTS_KEY = "@@controlEvents";
export declare class SubscriptionHandshakeLink extends ApolloLink {
    private subsInfoContextKey;
    private topicObservers;
    private clientObservers;
    constructor(subsInfoContextKey: any);
    request(operation: Operation): Observable<{}>;
    connectNewClients(connectionInfo: MqttConnectionInfo[], observer: ZenObservable.Observer<FetchResult>, operation: Operation): Promise<any[]>;
    connectNewClient(connectionInfo: MqttConnectionInfo, observer: ZenObservable.Observer<FetchResult>, selectionNames: string[]): Promise<any>;
    subscribeToTopics<T>(client: any, topics: string[], observer: ZenObservable.Observer<T>): Promise<{}[]>;
    subscribeToTopic<T>(client: any, topic: string, observer: ZenObservable.Observer<T>): Promise<{}>;
    onMessage: (topic: string, message: string, selectionNames: string[]) => void;
}
export {};
