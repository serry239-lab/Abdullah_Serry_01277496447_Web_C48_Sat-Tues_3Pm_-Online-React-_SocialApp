import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "./apis/notify.api";
import Loading from "../../components/Loading";
import type { NotificationInterface } from "../comments/notify.interface";
import { formatTimeAgo } from "../../utils/timeAgo";
import { Helmet } from "react-helmet";

export default function Notifications() {
  const { data, isLoading } = useQuery({
    queryKey: ["notify"],
    queryFn: getNotifications,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data?.data?.notifications.length) {
    return (
      <div>
        {data?.data?.notifications.map(
          (notification: NotificationInterface) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            ></NotificationItem>
          ),
        )}
      </div>
    );
  }

  if (!data?.data?.notifications.length){
    return<h1 className="text-center">No Notifications found</h1>
  }
}


function NotificationItem({
  notification,
}: {
  notification: NotificationInterface;
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notifications</title>
        <link rel="canonical" content="" />
      </Helmet>
      <div className="container flex items-center my-3 gap-2 border border-blue-500/30 rounded-full bg-blue-500/20 p-3 text-sm text-blue-600">
        <div className="flex items-center space-x-2 bg-blue-500 text-white border border-blue-500 rounded-3xl px-3 pl-1 py-1">
          <img
            className="h-6 w-6 rounded-full"
            src={notification.actor.photo}
            alt="userImage"
          />
          <p>{notification.actor.name}</p>
          <span>{formatTimeAgo(notification.createdAt)}</span>
        </div>
        <p className="pr-3">{notification.type}</p>
      </div>
    </>
  );
}
