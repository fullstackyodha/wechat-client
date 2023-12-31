import { floor, random } from "lodash";
import { avatarColors } from "./static.data";
import { addUser, clearUser } from "@/redux_toolkit/reducers/users.reducers";

export class Utils {
    static avatarColor() {
        // Produces a random number between min and max(inclusive)
        return avatarColors[floor(random(0.9) * avatarColors.length)];
    }

    static generateAvatarImage(text, backgroundColor, foregroundColor = "white") {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 200;
        canvas.height = 200;

        canvas.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height); //Canvas of 200 x 200

        // DRAW TEXT
        context.font = "normal 80px sans-serif";
        context.fillStyle = foregroundColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        // Returns the content of the current canvas as an image
        // that you can use as a source for another canvas or an HTML element.
        return canvas.toDataURL("image/png");
    }

    static dispatchUser(result, pageReload, dispatch, setUser) {
        pageReload(true);

        dispatch(addUser({ token: result.token, profile: result.user }));

        setUser(result.user);
    }

    static clearStore({
        dispatch,
        deleteStorageUsername,
        deleteSessionPageReload,
        setLoggedIn
    }) {
        dispatch(clearUser);
        deleteStorageUsername();
        deleteSessionPageReload();
        setLoggedIn(false);
    }
}
