function mapKeysToArray<K, V>(map: Map<K, V>): K[] {
    const result: K[] = [];
    map.forEach((_, key: K) => {
        result.push(key);
    });

    return result;
}


export default mapKeysToArray;
