export const groupTasksByUser = (tasks) => {
  return tasks?.reduce((acc, task) => {
    if (!acc[task?.userId]) {
      acc[task?.userId] = [];
    }
    acc[task?.userId].push(task?.completed);
    return acc;
  }, {});
};


export const GetTheCompletedUserId = (mapUserTask) => 
  Object.entries(mapUserTask)
    .filter(([_, completions]) => completions.every(completed => completed))
    .map(([userId]) => Number(userId));

export const SortUserData = (usersData) => usersData?.sort((a, b) => a.name.localeCompare(b.name));
