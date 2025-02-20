import React, { useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskColumn } from "../TaskComponents/TaskColumn";
import { FaAddressBook, FaPlus } from "react-icons/fa";

const ItemType = "TASK";

const ToDo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const { data: userTasks = [], refetch } = useQuery({
    queryKey: ["userTasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskDetails = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      email: user.email,
      time: new Date().toLocaleTimeString(),
    };

    axiosPublic.post("/tasks", taskDetails).then(() => {
      refetch();
      toast.success(`Task Added to ${taskDetails.category} Category`);
    });

    setModalOpen(false);
  };

  const moveTask = async (task, newCategory) => {
    try {
      await axiosPublic.put(`/tasks/${task._id}`, { category: newCategory });
      refetch();
    } catch (error) {
      toast.error("Failed to move task");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-11/12 mx-auto pt-16">
        <div>
          <h1 className="text-center font-bold text-[#d3a955] text-xl md:text-3xl pt-5">
            Welcome, <span className="underline">{user.displayName}</span>!
            Manage your <br /> tasks with TaskFlow.
          </h1>
          <p className="text-center mt-3 mb-2">
            Our ToDo page now includes an easy-to-use drag-and-drop feature,
            allowing you to reorder tasks effortlessly.{" "}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setModalOpen(true)}
            className="btn-outline border-b-8 md:w-1/5 btn px-4 py-2 rounded"
          >
            <FaPlus></FaPlus> Add New Task
          </button>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full shadow-2xl flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
              <form onSubmit={handleAddTask}>
                <input
                  name="title"
                  type="text"
                  placeholder="Task Title"
                  required
                  maxLength="50"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <textarea
                  name="description"
                  placeholder="Task Description"
                  maxLength="200"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                ></textarea>
                <select
                  name="category"
                  defaultValue="To-Do"
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskColumn
              key={category}
              category={category}
              refetch={refetch}
              tasks={userTasks.filter((task) => task.category === category)}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
export default ToDo;
