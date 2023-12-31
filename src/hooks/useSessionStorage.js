export function useSessionStorage(key, type) {
    try {
        // GET THE KEY VALUE
        if (type == "get") {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : "";
        }
        // SET THE KEY VALUE
        else if (type == "set") {
            const setValue = (value) => {
                window.sessionStorage.setItem(key, JSON.stringify(value));
            };

            return [setValue];
        }
        // DELETE THE KEY
        else {
            const deleteValue = () => {
                window.sessionStorage.removeItem(key);
            };

            return [deleteValue];
        }
    } catch (error) {
        console.log(error);
    }
}
