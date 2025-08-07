import { useState, useEffect } from "react";
import { BellIcon } from "@phosphor-icons/react";
import axios from "axios";
import api from "@/api";
import "./notification-dropdown.css";

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleClick = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            fetchNotifications(token);
        }
    }, []);

    const fetchNotifications = async token => {
        try {
            console.log("Token in fetch:", token);
            const res = await api.get("/customer/notifications/unread", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setNotifications(res.data.payload);
        } catch (err) {
            console.error("Failed to fetch notifications:", err);
        }
    };

    const markAsRead = async id => {
        const token = localStorage.getItem("auth-token");
        try {
            await axios.post(
                "http://localhost:8000/api/v0.1/customer/notifications/mark_as_read",
                { notification_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                },
            );

            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    const markAllAsRead = async () => {
        const token = localStorage.getItem("auth-token");
        try {
            await axios.post(
                "http://localhost:8000/api/v0.1/customer/notifications/mark_all_as_read",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                },
            );

            setNotifications([]);
        } catch (err) {
            console.error("Failed to mark all as read:", err);
        }
    };

    const formatDate = dateString => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="notif-dropdown">
            <button type="button" onClick={handleClick}>
                <BellIcon size={32} />
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <span>Notifications</span>
                        <button onClick={markAllAsRead}>
                            Mark All as Read
                        </button>
                    </div>

                    {notifications.length === 0 ? (
                        <p className="notification-message">
                            No notifications.
                        </p>
                    ) : (
                        <div className="notification-list">
                            {notifications.map(notif => (
                                <div
                                    className="notification-item"
                                    key={notif.id}
                                >
                                    <div className="notification-body">
                                        <span className="notification-dot">
                                            &#x2022;
                                        </span>
                                        <div className="notification-content">
                                            <div className="notification-message">
                                                {notif.message}
                                            </div>
                                            <div className="notification-footer">
                                                <span className="notification-time">
                                                    {formatDate(
                                                        notif.created_at,
                                                    )}
                                                </span>
                                                <button
                                                    className="mark-read-btn"
                                                    onClick={() =>
                                                        markAsRead(notif.id)
                                                    }
                                                >
                                                    Mark as Read
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
