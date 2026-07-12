import fs from "fs/promises";
import path from "path";
import { Member, Task, VolunteerEnrollment } from "@/context/AppContext";

const DB_PATH = path.join(process.cwd(), "src", "data", "db.json");

interface DatabaseSchema {
  members: Member[];
  tasks: Task[];
  enrollments: VolunteerEnrollment[];
}

const DEFAULT_MEMBERS: Member[] = [
  { email: "admin@nsfju.org", name: "Somsurya Banerjee", role: "Admin", wing: "General", status: "Active", password: "Aurobindo1906" },
  { email: "head@nsfju.org", name: "Rupankar Dutta", role: "Committee Head", wing: "Technical Cell", status: "Active", password: "Volunteering1906" },
  { email: "member@nsfju.org", name: "Abhijit Chakraborty", role: "Member", wing: "Technical Cell", status: "Active", password: "Volunteering1906" },
  { email: "priyanka@nsfju.org", name: "Priyanka Maitra", role: "Member", wing: "Media Cell", status: "Active", password: "Volunteering1906" }
];

const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    title: "Restructure Technical Cell Roster Framework",
    desc: "Build out database structures for housing entries to support off-campus outstation freshers.",
    wing: "Technical Cell",
    priority: "High",
    status: "todo",
    assignee: ["member@nsfju.org"],
    assignedBy: "Rupankar Dutta",
    deadline: "2026-07-18",
    visibility: "committee",
    duration: "8 Hours",
    volunteersJoined: []
  },
  {
    id: 2,
    title: "Produce Campus Vetting Audit Material",
    desc: "Coordinate with local design houses to produce printed booklets on safety norms.",
    wing: "Media Cell",
    priority: "Medium",
    status: "in-progress",
    assignee: ["priyanka@nsfju.org"],
    assignedBy: "Somsurya Banerjee",
    deadline: "2026-07-22",
    visibility: "public",
    duration: "4 Hours",
    volunteersJoined: []
  },
  {
    id: 3,
    title: "Volunteer Campaign: Setup Accommodation desk near Gate 4",
    desc: "Establish physical greeting coordinate tables to guide newcomers and distribute vetted lists.",
    wing: "Outreach Cell",
    priority: "High",
    status: "todo",
    assignee: [],
    assignedBy: "Rupankar Dutta",
    deadline: "2026-07-16",
    visibility: "voluntary",
    duration: "12 Hours",
    volunteersJoined: []
  }
];

export async function readDb(): Promise<DatabaseSchema> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    const defaultData: DatabaseSchema = {
      members: DEFAULT_MEMBERS,
      tasks: DEFAULT_TASKS,
      enrollments: []
    };
    await writeDb(defaultData);
    return defaultData;
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  // Ensure the directory exists
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
