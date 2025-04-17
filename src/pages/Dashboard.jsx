import React, { useEffect, useState } from "react";
import { getTopScoreGroupA } from "../services/score.service";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {data} = await getTopScoreGroupA();
      setStudents(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800 mb-3">Top 10 students of group A</h1>
    
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left w-32">Số báo danh</th>
                <th className="border px-4 py-2 text-left w-24">Toán</th>
                <th className="border px-4 py-2 text-left w-24">Vật lí</th>
                <th className="border px-4 py-2 text-left w-24">Hóa học</th>
                <th className="border px-4 py-2 text-left w-32">Tổng điểm</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{student.candidateId}</td>
                  <td className="border px-4 py-2">{student.math}</td>
                  <td className="border px-4 py-2">{student.physics}</td>
                  <td className="border px-4 py-2">{student.chemistry}</td>
                  <td className="border px-4 py-2">
                    {student.math + student.physics + student.chemistry}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
