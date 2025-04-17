import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from "recharts";
import { getSubjects } from "../services/subject.service";
import { getReport } from "../services/score.service";
import Loading from "../components/Loading";

export default function CategoryBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSubjects();
        setSubjectList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
  }

  useEffect(() => {
    const fetchData = async (selectedSubject) => {
      setLoading(true);
      const { data } = await getReport(selectedSubject);
      setData(data);
      setLoading(false);
    }

    fetchData(selectedSubject);
  }, [selectedSubject])

  return (
    <div className="max-w-[800px] h-96">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Statistics of the number of students with scores</h2>
      <div className="mb-4">
        <label htmlFor="subject-select">Select the subject:</label>
        <select id="subject-select" className="ml-3 px-1 focus:outline-none focus:ring-0 focus:border-transparent" onChange={handleChange}>
          {subjectList.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.displayName}
            </option>
          ))}
        </select>
      </div>
      
      {!loading && <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis tickFormatter={(v) => v >= 1e6 ? `${v/1e6}M` : v >= 1e3 ? `${v/1e3}K` : v}>
            <Label value="Số lượng sinh viên" angle={-90} position="left" offset={10} />
          </YAxis>
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Số lượng sinh viên" barSize={45} />
        </BarChart>
      </ResponsiveContainer>}

      {loading && <Loading />}
    </div>
  );
}
