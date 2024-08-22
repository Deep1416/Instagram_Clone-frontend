import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setAuthUser } from "@/config/userSlice";
import { API_END_POINT_USER } from "@/utils/db";
import axios from "axios";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatePost from "../createPost/CreatePost";
import { useState } from "react";
import { setPosts, setSelectedPost } from "@/config/postSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT_USER}/users/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (item) => {
    if (item === "Logout") {
      logouthandler();
    } else if (item === "Create") {
      setOpen(true);
    } else if (item === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (item === "Home") {
      navigate("/");
    } else if (textType === 'Messages') {
      navigate("/chat");
  }
  };

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icon}
                <span>{item.text}</span>
                {/* Uncomment and adjust the following block if you want to handle notifications */}
                {/* {item.text === "Notifications" && likeNotification.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                      >
                        {likeNotification.length}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        {likeNotification.length === 0 ? (
                          <p>No new notifications</p>
                        ) : (
                          likeNotification.map((notification) => (
                            <div
                              key={notification.userId}
                              className="flex items-center gap-2 my-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={notification.userDetails?.profilePicture}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification.userDetails?.username}
                                </span>{" "}
                                liked your post
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )} */}
              </div>
            );
          })}
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
