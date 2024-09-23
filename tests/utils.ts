export function areObjectsEqualDeep(obj1: any, obj2: any): boolean {
    if (obj1.constructor !== obj2.constructor) {
        return false;
    }

    for (const prop in obj1) {
        if (typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object') {
            if (!areObjectsEqualDeep(obj1[prop], obj2[prop])) {
                console.warn(`prop ${JSON.stringify(prop)} of ${JSON.stringify(obj2)} not is equal`)
                return false;
            }
        } else if (obj1[prop] !== obj2[prop]) {
            console.warn(`prop ${JSON.stringify(prop)} of ${JSON.stringify(obj2)} not is equal`)
            return false;
        }
    }

    return true;
}