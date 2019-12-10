function setToArray<T>(setToConvert: Set<T>): T[] {
    const result: T[] = [];
    setToConvert.forEach((element: T) => {
        result.push(element);
    });

    return result;

}

export default setToArray;
