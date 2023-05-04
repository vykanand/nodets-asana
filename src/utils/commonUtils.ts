export const processToken = (inputToken: string): string => {
    if (!inputToken) {
        throw new Error('Invalid token');
    } else {
        return inputToken.substring(7, inputToken.length);
    }
};

export const jsonToString = (str: any): string => {
    return JSON.stringify(str);
};

export const cl = (message): any => {
    let e = new Error();
    let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
    let lineNumber = frame.split(":").reverse()[1];
    let functionName = frame.split(" ")[5];
    console.log( '--------Better Console Log--------' + functionName + ":" + lineNumber + " => " + message );
  }