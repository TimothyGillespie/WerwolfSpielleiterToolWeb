function cloneMap<K, V>(mapToClone: Map<K, V>): Map<K, V> {
    const result = new Map<K, V>();

    mapToClone.forEach((value: V, key: K) => {result.set(key, value)});

    return result;
}

export default cloneMap;
