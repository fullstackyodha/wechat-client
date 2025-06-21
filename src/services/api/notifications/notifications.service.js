import axios from "@/services/axios";

class NotificationsService {
    async getUserNotifications() {
        const response = await axios.get("/notifications");
        return response;
    }

    async markMessageAsRead(messageId) {
        const response = await axios.put(`/notification/${messageId}`);
        return response;
    }
}

export const notificationService = new NotificationsService();
