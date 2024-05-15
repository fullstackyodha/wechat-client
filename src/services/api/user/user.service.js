class UserService {
    async getUserSuggestions() {
        const response = await axios.get("/user");
        // console.log(body);

        return response;
    }
}

export const userService = new UserService();
