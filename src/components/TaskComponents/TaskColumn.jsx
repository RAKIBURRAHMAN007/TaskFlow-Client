import { useDrag, useDrop } from "react-dnd";

const ItemType = "TASK";

export const TaskColumn = ({ category, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (task) => moveTask(task, category),
  });

  return (
    <div
      ref={drop}
      className="border border-gray-300 rounded p-4 min-h-[300px]"
    >
      <h2 className="text-center font-semibold text-lg">{category}</h2>
      <div className="mt-4">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export const Task = ({ task }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: task,
  });

  return (
    <div
      ref={drag}
      className="p-4 mb-4 bg-gray-100 rounded shadow-md cursor-move"
    >
      <h3 className="font-semibold">Task: {task.title}</h3>
      <p>
        <span className="font-semibold">Description: </span> {task.description}
      </p>
      <p>
        <span className="font-semibold">Added at: </span>
        {task.time}
      </p>
    </div>
  );
};
