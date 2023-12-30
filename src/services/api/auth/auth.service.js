import axios from "../../axios";

class AuthService {
    // SIMPLER WAY
    // async postData(url, body, token) {
    //     const response = await axios.post(`${url}/${token}`, body);

    //     return response;
    // }

    async signUp(body) {
        const response = await axios.post("/signup", body);
        // console.log(body);

        return response;
    }

    async signIn(body) {
        const response = await axios.post("/signin", body);

        return response;
    }

    async forgotPassword(email) {
        const response = await axios.post("/forgot-password", { email });

        return response;
    }

    async resetPassword(body, token) {
        const response = await axios.post(`/reset-password/${token}`, body);

        return response;
    }
}

export const authService = new AuthService();
