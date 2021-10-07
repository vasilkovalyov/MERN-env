import React from "react"
import Notification from "antd/es/notification"

export const showAlert = (type = 'success', message, description, placement = 'topRight') => {
    Notification[type]({
        message,
        description,
        placement,
        duration: 3
    });
}