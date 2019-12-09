

// This function will calculate the difference of two arrays as thought they are sets
// (though elements listed twice will still exist twice if not deleted)
function difference<T>(minuendArray: T[], subtrahendArray: T[]): T[] {
    //Not a mutating function
    return minuendArray
        .filter((element: T) => {
            // will be undefined when no element is found which is falsy in javascript
            return(!subtrahendArray.find((innerElement: T) => innerElement === element))
        });
}

export default difference;
