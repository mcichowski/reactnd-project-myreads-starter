/**
 * Created by mcichowski on 22/12/17.
 */

import sortBy from 'sort-by';

export const mapData = (array, keyParameter = 'id') => {
    const map = {};
    array.forEach((entry) => map[entry[keyParameter]] = entry);
    return map;
};

export const getSortedArrayFromObject = (obj, sortByParam = 'title') => {
    const sortedArray = Object.keys(obj).map(e => obj[e]);
    sortedArray.sort(sortBy(sortByParam));
    return sortedArray;
};