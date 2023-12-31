export function useLocalStorage(key, type) {
    try {
        // GET THE VALUE
        if (type == "get") {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : "";
        }
        // SET THE KEY VALUE
        else if (type == "set") {
            const setValue = (value) => {
                window.localStorage.setItem(key, JSON.stringify(value));
            };

            return [setValue];
        }
        // DELETE THE KEY
        else {
            const deleteValue = () => {
                window.localStorage.removeItem(key);
            };

            return [deleteValue];
        }
    } catch (error) {
        console.log(error);
    }
}
