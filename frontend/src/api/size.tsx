import instance from "./config";

export const listSize = () => {
    const url = `sizes`
    return instance.get(url)
}