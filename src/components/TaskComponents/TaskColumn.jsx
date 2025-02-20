import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ItemType = "TASK";

export const TaskColumn = ({ category, tasks, refetch, moveTask }) => {
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
          <Task key={task._id} task={task} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export const Task = ({ task, refetch }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: task,
  });
  const axiosPublic = UseAxiosPublic();
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deleteTask/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
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
      <div className="flex justify-between gap-2 mt-2">
        {/* Delete Button */}
        <button
          onClick={() => onDelete(task._id)}
          title="Delete Task"
          className="text-red-600 hover:text-red-800"
        >
          <FaTrashAlt />
        </button>

        {/* Update Button */}
        <button
          onClick={() => onUpdate(task._id)}
          title="Update Task"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit />
        </button>
      </div>
    </div>
  );
};
