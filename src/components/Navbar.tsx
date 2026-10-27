import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { authContext } from "../context/auth.context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationsCount,
  readAllNotifications,
} from "../features/notifications/apis/notify.api";

export function NavBar() {
  const context = useContext(authContext);
  if (!context) throw new Error();
  const { setToken, setUser, user } = context;
  // const user = context?.user;
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("tkn");
    setToken(null);
    setUser(null);
    toast.success("Successfully Logged Out!");
    navigate("/");
  }

  const q = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifyCount"],
    queryFn: getNotificationsCount,
  });

  const { mutate } = useMutation({
    onSuccess: () => {
      (q.invalidateQueries({ queryKey: ["notifyCount"] }),
        q.invalidateQueries({ queryKey: ["notify"] }));
    },
    mutationFn: readAllNotifications,
  });

  function handleReadAllNotifications() {
    mutate();
  }

  return (
    <Navbar className="bg-blue-900 text-white p-5" fluid rounded>
      <div className="container flex flex-wrap justify-between items-center">
        <NavbarBrand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Social App
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={user?.name || "User settings"}
                img={
                  user?.photo ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">
                {user?.email || "Guest User"}
              </span>
              <span className="block truncate text-sm font-medium">
                {user?.name || "Guest User"}
              </span>
            </DropdownHeader>
            <Link to={"/profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <Link to={"/settings"}>
              <DropdownItem>Settings</DropdownItem>
            </Link>
            {" "}
            <DropdownDivider />
            <DropdownItem onClick={handleLogOut}>Log Out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <Link className="text-white" to={"/feed"}>
            Feed
          </Link>
          <Link className="text-white" to={"/profile"}>
            Profile
          </Link>
          <Link className="text-white flex relative" to={"/notifications"}>
            <span>Notifications</span>
            <span
              onClick={handleReadAllNotifications}
              className="size-6 flex justify-center items-center p-1 bg-red-600 text-white rounded-full absolute -top-4 left-20"
            >
              {data?.data?.unreadCount}
            </span>
          </Link>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
