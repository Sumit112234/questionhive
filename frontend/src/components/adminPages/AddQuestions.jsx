import React, { useState } from "react";
import axios from "axios";


const AddQuestions = () => {
  let url = import.meta.env.VITE_BACKEND_URL;
  const [questionData, setQuestionData] = useState({
    difficulty: "",
    category: "",
    question: "",
    options: ["", "", "", ""], // Four options by default
    answer: "",
    subject: "",
    chapter: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(
        `${url}/api/question/add-question`,
        questionData
      );
      setMessage(response.data.message || "Question added successfully!");
      setQuestionData({
        difficulty: "",
        category: "",
        question: "",
        options: ["", "", "", ""],
        answer: "",
        subject: "",
        chapter: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred while adding the question."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <form
        className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Add a Question
        </h2>

        {/* Difficulty */}
        <label className="block mb-4">
          <span className="text-sm font-semibold">Difficulty:</span>
          <select
            name="difficulty"
            value={questionData.difficulty}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        {/* Category */}
        <label className="block mb-4">
          <span className="text-sm font-semibold">Category:</span>
          <input
            type="text"
            name="category"
            value={questionData.category}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category"
            required
          />
        </label>

          {/* Subject */}
          <label className="block mb-4">
          <span className="text-sm font-semibold">Subject:</span>
          <input
            type="text"
            name="subject"
            value={questionData.subject}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subject"
            required
          />
        </label>

        {/* Chapter */}
        <label className="block mb-4">
          <span className="text-sm font-semibold">Chapter:</span>
          <input
            type="text"
            name="chapter"
            value={questionData.chapter}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter chapter"
            required
          />
        </label>

        {/* Question */}
        <label className="block mb-4">
          <span className="text-sm font-semibold">Question:</span>
          <textarea
            name="question"
            value={questionData.question}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter question"
            required
          />
        </label>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {questionData.options.map((option, index) => (
            <label key={index} className="block">
              <span className="text-sm font-semibold">Option {index + 1}:</span>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                placeholder={`Option ${index + 1}`}
                required
              />
            </label>
          ))}
        </div>

        {/* Answer */}
        <label className="block mb-4">
          <span className="text-sm font-semibold">Correct Answer:</span>
          <input
            type="text"
            name="answer"
            value={questionData.answer}
            onChange={handleChange}
            className="block w-full mt-2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the correct answer"
            required
          />
        </label>

      

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            "Submit"
          )}
        </button>

        {message && (
          <p className="mt-6 text-center text-lg font-medium text-green-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddQuestions;
