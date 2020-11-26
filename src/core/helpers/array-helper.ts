export class ArrayHelper{
    static isEmpty(array: any[]): boolean {
        if (array.length === 0) {
            return true;
        }
        return false;
    }

    static isArrayElementEmpty(array: any[], index: number = 0): boolean {
        if (array[index] == null || array[index] === '') {
            return true;
        }
        return false;
    }

    static isAnyArrayElementEmpty(array: any[]): boolean {
        for (let item of array) {
            if (item == null && item === '') {
                return true;
            }
        }
        return false;
    }

    static removeEmptyArrayIndexes(array: any[]): any[] {
        const resultArray: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if(!this.isArrayElementEmpty(array, i)) {
                resultArray.push(array[i]);
            }
        }
        return resultArray;
    }
}