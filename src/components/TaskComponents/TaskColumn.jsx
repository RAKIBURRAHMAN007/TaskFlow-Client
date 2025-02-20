import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

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
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [, drag] = useDrag({
    type: ItemType,
    item: task,
  });
  const axiosPublic = UseAxiosPublic();
  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Task!",
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
              text: "Task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const taskDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      email: user.email,
      time: new Date().toLocaleTimeString(),
    };

    axiosPublic.patch(`/taskUpdate/${updateId}`, taskDetails).then(() => {
      refetch();
      Swal.fire({
        title: "Updated!",
        text: "Task has been updated.",
        icon: "success",
      });
    });

    setModalOpen(false);
  };
  return (
    <div
      ref={drag}
      className="p-4 mb-4 bg-gray-100 rounded shadow-md cursor-move break-words w-full"
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
          onClick={() => {
            setModalOpen(true);
            setUpdateId(task._id);
          }}
          title="Update Task"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit />
        </button>
      </div>
      {modalOpen && (
        <div className="fixed top-0 bg-gray-50/45 left-0 w-full h-full shadow-2xl flex justify-center items-center z-50">
          <div className=" bg-white border-2 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Task</h3>
            <form onSubmit={handleUpdateTask}>
              <input
                name="title"
                type="text"
                placeholder="Task Title"
                defaultValue={task.title}
                required
                maxLength="50"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <textarea
                name="description"
                placeholder="Task Description"
                defaultValue={task.description}
                maxLength="200"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              ></textarea>
              <select
                name="category"
                defaultValue={task.category}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Task
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
