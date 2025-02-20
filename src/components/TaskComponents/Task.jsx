import { useDrag } from "react-dnd";

const ItemType = "TASK";

export const Task = ({ task }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: task,
  });
  console.log(task);

  return (
    <div
      ref={drag}
      className="p-4 mb-4 bg-gray-100 rounded shadow-md cursor-move"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="bg-red-500">{task.time || "No time available"}</p>
    </div>
  );
};
