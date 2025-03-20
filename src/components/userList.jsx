import { useEffect, useState } from "react";

import {
  GetTheCompletedUserId,
  groupTasksByUser,
  SortUserData,
} from "../helpers/helpers";
import Table from "./table";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        const tasksResponse = await fetch(
          "https://nextjs-boilerplate-five-plum-29.vercel.app/api/tasks"
        );
        const tasks = await tasksResponse.json();

        const mapUserTask = groupTasksByUser(tasks);

        const usersWithAllCompletedTasks = GetTheCompletedUserId(mapUserTask);

        const userPromises = usersWithAllCompletedTasks?.map((userId) =>
          fetch(
            `https://nextjs-boilerplate-five-plum-29.vercel.app/api/users/${userId}`
          ).then((res) => res.json())
        );

        const usersData = await Promise.all(userPromises);
        const sortuser = SortUserData(usersData);

        setUsers(sortuser);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchTasksAndUsers();
  }, []);

  return (
    <>
      <p className="flex justify-center items-center mt-5 text-xl font-mono">
        Completed Users List
      </p>
      <div className="flex justify-center items-center">
        <Table users={users} isLoading={loading} isError={error} />
      </div>
    </>
  );
};

export default UserList;
