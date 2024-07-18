import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import {
  fetchAllUsers,
  fetchLikedUsers,
  fetchMatchedUsers,
} from "@/redux/users/usersActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactCard from "@/components/ContactCard";

const FindAMatch = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const likedUsers = useSelector((state: RootState) => state.users.likedUsers);
  const matchedUsers = useSelector(
    (state: RootState) => state.users.matchedUsers
  );
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchAllUsers() as any);
  }, []);

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getLikedUsers = () => {
    dispatch(fetchLikedUsers() as any);
  }

    const getMatchedUsers = () => {
        dispatch(fetchMatchedUsers() as any);
    }

  function handleSelect(name: string) {
    console.log(name);
  }

  return (
    <Tabs defaultValue="all-users" className="w-full">
      <TabsList className="mb-2 bg-black w-full">
        <TabsTrigger className="w-[33%]" value="all-users">
          All Users
        </TabsTrigger>
        <TabsTrigger className="w-[33%]" value="liked-users" onClick={getLikedUsers}>
          Liked Users
        </TabsTrigger>
        <TabsTrigger className="w-[33%]" value="matches" onClick={getMatchedUsers}>
          Matches
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all-users">
        <div className="h-[100vh] w-full overflow-scroll">
          <input
            type="text"
            placeholder="Search for users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[99vw] mb-3 bg-[#262626] text-white px-3 py-2 rounded-lg border border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
          />
          {filteredUsers.map((user) => (
            <ContactCard
              key={user.user_id}
              user={user}
              onClick={() => handleSelect(user.name)}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="liked-users">
        <div className="h-[100vh] w-full overflow-scroll">
          {likedUsers.map((user) => (
            <ContactCard
              key={user.user_id}
              user={user}
              onClick={() => handleSelect(user.name)}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="matches">
        <div className="h-[100vh] w-full overflow-scroll">
          {matchedUsers.map((user) => (
            <ContactCard
              key={user.user_id}
              user={user}
              onClick={() => handleSelect(user.name)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FindAMatch;