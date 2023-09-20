import _ from "lodash";

export const transformArrayByField = (collection: any[], field: string) =>  collection.map(el => el[field]);

export const calculateMeanList = (collection: any[]) => _.mean(collection);
