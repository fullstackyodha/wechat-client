import { notificationData } from "@mocks/data/notification.mock";
import { emptyNotificationsMock } from "@mocks/handlers/notification";
import { server } from "@mocks/server";
import Notification from "@pages/social/notifications/Notification";
import { notificationService } from "@services/api/notifications/notification.service";
import { NotificationUtils } from "@services/utils/notification-utils.service";

import { fireEvent, render, screen } from "@/services/utils/test-utils.jsx";
import { vitest } from "vitest";

describe("Notification", () => {
    it("should display empty notification message", async () => {
        server.use(emptyNotificationsMock);

        render(<Notification />);

        const cardElementItems = screen.queryByTestId("notification-box");
        const emptyPage = await screen.findByTestId("empty-page");

        expect(cardElementItems).toBeNull();
        expect(emptyPage).toBeInTheDocument();
        expect(emptyPage.textContent).toEqual("You have no notification");
    });

    it("should have 1 card element item", async () => {
        render(<Notification />);

        const cardElementItems = await screen.findAllByTestId("notification-box");

        expect(cardElementItems.length).toEqual(1);
    });

    it("should show notification preview modal", async () => {
        render(<Notification />);
        const cardElementItems = await screen.findAllByTestId("notification-box");

        fireEvent.click(cardElementItems[0]);

        const notificationPreview = await screen.findByTestId("notification-preview");
        expect(notificationPreview).toBeInTheDocument();
    });

    it("should handle mark as read", async () => {
        vitest.spyOn(NotificationUtils, "markMessageAsRead");

        render(<Notification />);
        const cardElementItems = await screen.findAllByTestId("notification-box");

        fireEvent.click(cardElementItems[0]);

        expect(NotificationUtils.markMessageAsRead).toHaveBeenCalledWith(
            notificationData._id,
            notificationData,
            expect.any(Function)
        );
    });

    it("should handle delete", async () => {
        jest.spyOn(notificationService, "deleteNotification");
        render(<Notification />);
        const subtitleElement = await screen.findAllByTestId("subtitle");
        fireEvent.click(subtitleElement[0]);
        expect(notificationService.deleteNotification).toHaveBeenCalledWith("12345");
    });
});
