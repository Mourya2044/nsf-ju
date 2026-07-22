"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Member {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Committee Head" | "Member";
  wing: "General" | "Technical Cell" | "Media Cell" | "Outreach Cell";
  status: "Active" | "Deactivated" | "Pending";
  password?: string;
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  wing: "Technical Cell" | "Media Cell" | "Outreach Cell";
  priority: "Low" | "Medium" | "High";
  status: "todo" | "in-progress" | "completed";
  assignee: string[]; // Email array
  assignedBy: string;
  deadline: string;
  visibility: "private" | "committee" | "public" | "voluntary";
  duration: string;
  volunteersJoined?: string[]; // Email array
}

export interface VolunteerEnrollment {
  id: number;
  taskId: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  cell: string;
  date: string;
}

interface AppContextType {
  currentUser: Member | null;
  members: Member[];
  tasks: Task[];
  enrollments: VolunteerEnrollment[];
  theme: "light" | "dark";
  toggleTheme: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, pass: string, wing: Member["wing"], inviteCode: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  addTask: (task: Omit<Task, "id" | "status" | "assignedBy" | "volunteersJoined">) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  joinTask: (taskId: string) => Promise<void>;
  updateMemberRole: (memberId: string, newRole: Member["role"]) => Promise<void>;
  updateMemberWing: (memberId: string, newWing: Member["wing"]) => Promise<void>;
  updateMemberStatus: (memberId: string, newStatus: Member["status"]) => Promise<void>;
  toggleMemberStatus: (memberId: string) => Promise<void>;
  enrollVolunteer: (enrollment: Omit<VolunteerEnrollment, "id" | "date">) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [enrollments, setEnrollments] = useState<VolunteerEnrollment[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch initial data from our Node server-side APIs
  const refreshData = async () => {
    try {
      const membersRes = await fetch("/api/members");
      const membersData = await membersRes.json();
      if (membersData.success) {
        setMembers(membersData.members);
      }

      const tasksRes = await fetch("/api/tasks");
      const tasksData = await tasksRes.json();
      if (tasksData.success) {
        setTasks(tasksData.tasks);
      }
    } catch (err) {
      console.error("Failed to load initial data from APIs", err);
    }
  };

  useEffect(() => {
    // Restore theme preference
    const storedTheme = localStorage.getItem("nsf_theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    refreshData().then(() => {
      // Restore user session from localStorage
      const storedUser = localStorage.getItem("nsf_currentUser");
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoaded(true);
    });
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("nsf_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        localStorage.setItem("nsf_currentUser", JSON.stringify(data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: "Network error during login authentication." };
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    wing: Member["wing"],
    inviteCode: string
  ) => {
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass, wing, inviteCode })
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: "Network error during registration." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout request failed", e);
    }
    setCurrentUser(null);
    localStorage.removeItem("nsf_currentUser");
  };

  const addTask = async (newTask: Omit<Task, "id" | "status" | "assignedBy" | "volunteersJoined">) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          assignedBy: currentUser?.name || "Committee Lead"
        })
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) => [data.task, ...prev]);
      }
    } catch (err) {
      console.error("Network error creating task", err);
    }
  };

  const completeTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete" })
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? data.task : t))
        );
      }
    } catch (err) {
      console.error("Network error completing task", err);
    }
  };

  const joinTask = async (taskId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join", email: currentUser.email })
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? data.task : t))
        );
      }
    } catch (err) {
      console.error("Network error enlisting for task", err);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: Member["role"]) => {
    try {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) =>
          prev.map((c) => (c.id === memberId ? data.member : c))
        );
        if (currentUser && currentUser.id === memberId) {
          const updatedUser = { ...currentUser, role: newRole };
          setCurrentUser(updatedUser);
          localStorage.setItem("nsf_currentUser", JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      console.error("Network error updating member role", err);
    }
  };

  const updateMemberWing = async (memberId: string, newWing: Member["wing"]) => {
    try {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wing: newWing })
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) =>
          prev.map((c) => (c.id === memberId ? data.member : c))
        );
        if (currentUser && currentUser.id === memberId) {
          const updatedUser = { ...currentUser, wing: newWing };
          setCurrentUser(updatedUser);
          localStorage.setItem("nsf_currentUser", JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      console.error("Network error updating member wing", err);
    }
  };

  const updateMemberStatus = async (memberId: string, newStatus: Member["status"]) => {
    try {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) =>
          prev.map((c) => (c.id === memberId ? data.member : c))
        );
      }
    } catch (err) {
      console.error("Network error updating member status", err);
    }
  };

  const toggleMemberStatus = async (memberId: string) => {
    const member = members.find((c) => c.id === memberId);
    if (!member) return;

    const nextStatus = member.status === "Active" ? "Deactivated" : "Active";

    try {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        setMembers((prev) =>
          prev.map((c) => (c.id === memberId ? data.member : c))
        );
      }
    } catch (err) {
      console.error("Network error toggling member status", err);
    }
  };

  const enrollVolunteer = async (enrollment: Omit<VolunteerEnrollment, "id" | "date">) => {
    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollment)
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments((prev) => [data.enrollment, ...prev]);
      }
    } catch (err) {
      console.error("Network error during volunteer enrollment", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        members,
        tasks,
        enrollments,
        theme,
        toggleTheme,
        login,
        register,
        logout,
        addTask,
        completeTask,
        joinTask,
        updateMemberRole,
        updateMemberWing,
        updateMemberStatus,
        toggleMemberStatus,
        enrollVolunteer
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppStateProvider");
  }
  return context;
}
