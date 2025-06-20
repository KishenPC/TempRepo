let cachedArray: any[] = [];

export function setArray(data: any[]) {
    cachedArray = data
}

export function getArray() {
    return cachedArray;
}