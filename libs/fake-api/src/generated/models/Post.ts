/* tslint:disable */
/* eslint-disable */
/**
 * JSONPlaceholder
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime.ts';
/**
 * 
 * @export
 * @interface Post
 */
export interface Post {
    /**
     * 
     * @type {number}
     * @memberof Post
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof Post
     */
    userId: number;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    body: string;
}

/**
 * Check if a given object implements the Post interface.
 */
export function instanceOfPost(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "body" in value;

    return isInstance;
}

export function PostFromJSON(json: any): Post {
    return PostFromJSONTyped(json, false);
}

export function PostFromJSONTyped(json: any, ignoreDiscriminator: boolean): Post {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'userId': json['userId'],
        'title': json['title'],
        'body': json['body'],
    };
}

export function PostToJSON(value?: Post | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'userId': value.userId,
        'title': value.title,
        'body': value.body,
    };
}

