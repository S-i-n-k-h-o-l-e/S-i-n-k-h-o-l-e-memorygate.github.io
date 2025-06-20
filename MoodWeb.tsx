import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const MOOD_AXES = ["Joy", "Fear", "Sadness", "Curiosity", "Calm", "Tension"];

export default function MoodWeb({ user }: { user: any }) {
  const [dataPoints, setDataPoints] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const q = query(
      collection(db, "mood-web"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.slice(0, 20).map((doc) => doc.data());
      const moodData = [0, 0, 0, 0, 0, 0];
      entries.forEach((entry: any) => {
        const index = Math.floor(Math.random() * MOOD_AXES.length);
        moodData[index] += entry.meaning;
      });
      setDataPoints(moodData);
    });
    return () => unsub();
  }, [user]);

  return (
    <div className="bg-white/5 p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Mood Web</h2>
      <Radar
        data={{
          labels: MOOD_AXES,
          datasets: [
            {
              label: "Emotional Shape",
              data: dataPoints,
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 2,
            },
          ],
        }}
        options={{ scales: { r: { angleLines: { display: false }, beginAtZero: true } } }}
      />
    </div>
  );
}