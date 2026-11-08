import { createFileRoute } from "@tanstack/react-router";
import { StudyBuddy } from "@/components/study-buddy";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <StudyBuddy />;
}
