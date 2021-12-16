function createGuid () {
    const tmp = URL.createObjectURL(new Blob())
    const guid = tmp.toString()
    URL.revokeObjectURL(tmp)
    return guid.slice(guid.lastIndexOf('/') + 1)
}

export default {
    createGuid
}
