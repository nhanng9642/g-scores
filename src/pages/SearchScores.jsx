import { useState } from "react";
import { getScoreById } from "../services/score.service";

const subjectMap = {
  candidateId: "Số báo danh",
  math: "Toán",
  literature: "Văn",
  foreignLanguage: "Ngoại ngữ",
  physics: "Vật lí",
  chemistry: "Hóa học",
  biology: "Sinh học",
  history: "Lịch sử",
  geography: "Địa lí",
  civicEducation: "GDCD",
  languageCode: "Mã ngoại ngữ"
};

export default function SearchScores() {
  const [regNumber, setRegNumber] = useState("");
  const [scoreData, setScoreData] = useState();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getScoreById(regNumber);
      setScoreData(data);
    } catch (error) {
      console.log(error);
      setError("Không tìm thấy thông tin thí sinh này");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">User Registration</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 items-start md:items-center"
        >
          <label htmlFor="regNumber" className="whitespace-nowrap">
            Registration Number:
          </label>
          <input
            type="text"
            required
            id="regNumber"
            className="border rounded px-2 py-1 text-sm w-full md:w-auto"
            placeholder="Enter registration number"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value) & setError("")}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 text-sm cursor-pointer"
          >
            Submit
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-2">Detailed Scores</h2>
        {!scoreData && (
          <p className="text-sm text-gray-700">Detailed view of search scores here!</p>
        )}

        {scoreData && (
          <div className="text-gray-800 flex flex-wrap gap-x-5 gap-y-2">
            {Object.entries(scoreData)
              .filter(([, value]) => value !== null)
              .map(([subject, score]) => (
                <span key={subject}>
                  {subjectMap[subject] || subject}: {score}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
