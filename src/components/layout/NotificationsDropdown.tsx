import { useState } from "react";
import { Bell, Check, X, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type NotificationType = "alert" | "info" | "warning";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  isRead: boolean;
}

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: "alert",
    message: "High severity alert: Duplicate invoice detected",
    time: "2 min ago",
    isRead: false,
  },
  {
    id: 2,
    type: "warning",
    message: "New unmatched transaction requires review",
    time: "15 min ago",
    isRead: false,
  },
  {
    id: 3,
    type: "info",
    message: "Weekly transaction report is ready for download",
    time: "1 hour ago",
    isRead: true,
  },
  {
    id: 4,
    type: "alert",
    message: "Suspicious activity detected in vendor account",
    time: "3 hours ago",
    isRead: true,
  },
];

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed",
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
    setIsOpen(false);
    navigate("/alerts");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-alert-high rounded-full text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No notifications</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <li 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${notification.isRead ? "" : "bg-blue-50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${notification.isRead ? "text-gray-700" : "text-gray-900 font-medium"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-2 border-t border-gray-100 bg-gray-50">
          <Button variant="ghost" size="sm" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
