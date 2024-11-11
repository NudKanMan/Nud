// /src/app/hooks/useActivity.ts
import { useEffect, useState } from "react";

interface Activity {
  id: string;
  title: string;
  description: string;
  maxParticipants: number;
  startDate: string;
  endDate: string;
}

export function useActivity(id: string) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ACTIVITY_SERVICE_URL}/activities/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch activity");
        }
        const data = await response.json();
        setActivity(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  return { activity, error };
}