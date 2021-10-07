const isExistObjectInArray = (array, objName, value) => {
    return array.findIndex((item) => item[objName] === value) !== -1 ? true : false
}

const isFileImage = ext => (/\gif|jpe?g|tiff?|png|webp|bmp$/i).test(ext);

export { isExistObjectInArray, isFileImage }