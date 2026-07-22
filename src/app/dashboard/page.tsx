"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp, Task, Member } from "@/context/AppContext";
import {
  Lock,
  LogOut,
  Plus,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  KeyRound,
  ShieldAlert,
  UserCheck,
  UserX
} from "lucide-react";

export default function DashboardPage() {
  const {
    currentUser,
    members,
    tasks,
    login,
    register,
    logout,
    addTask,
    completeTask,
    joinTask,
    updateMemberRole,
    updateMemberWing,
    updateMemberStatus,
    toggleMemberStatus
  } = useApp();

  // Authentication states
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regWing, setRegWing] = useState<Member["wing"]>("Technical Cell");
  const [regPasscode, setRegPasscode] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // Toggle sections
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskWing, setTaskWing] = useState<Task["wing"]>("Technical Cell");
  const [taskPriority, setTaskPriority] = useState<Task["priority"]>("Medium");
  const [taskVisibility, setTaskVisibility] = useState<Task["visibility"]>("committee");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskAssignees, setTaskAssignees] = useState<string[]>([]); // Email array

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await login(authEmail, authPassword);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAuthEmail("");
      setAuthPassword("");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");
    const res = await register(regName, regEmail, regPassword, regWing, regPasscode);
    if (!res.success) {
      setRegError(res.message);
    } else {
      setRegSuccess(res.message);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegPasscode("");
    }
  };

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskVisibility !== "voluntary" && taskAssignees.length === 0) {
      alert("Please select at least one assignee or set visibility to Volunteer.");
      return;
    }

    await addTask({
      title: taskTitle,
      desc: taskDesc,
      wing: taskWing,
      priority: taskPriority,
      visibility: taskVisibility,
      deadline: taskDeadline,
      duration: taskDuration || "Not Estimated",
      assignee: taskAssignees
    });

    // Reset task form
    setTaskTitle("");
    setTaskDesc("");
    setTaskDeadline("");
    setTaskDuration("");
    setTaskAssignees([]);
    setShowCreateTask(false);
  };

  const handleAssigneeCheckboxChange = (email: string, checked: boolean) => {
    if (checked) {
      setTaskAssignees((prev) => [...prev, email]);
    } else {
      setTaskAssignees((prev) => prev.filter((e) => e !== email));
    }
  };

  // Filter tasks based on logged-in user role & wing permissions
  const visibleTasks = tasks.filter((task) => {
    if (!currentUser) return false;
    
    // Admins see all tasks
    if (currentUser.role === "Admin") return true;

    // Committee Heads see all tasks within their wing, plus public/voluntary tasks
    if (currentUser.role === "Committee Head") {
      if (task.wing === currentUser.wing) return true;
      return task.visibility === "public" || task.visibility === "voluntary";
    }

    // Members see tasks they are assigned to, plus voluntary/public tasks, 
    // or tasks associated with their wing that are marked 'committee' visibility
    const isAssigned = task.assignee.includes(currentUser.email);
    if (isAssigned) return true;
    if (task.visibility === "voluntary" || task.visibility === "public") return true;
    if (task.visibility === "committee" && task.wing === currentUser.wing) return true;

    return false;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          
          {!currentUser ? (
            /* ==================== UNAUTHENTICATED STATE ==================== */
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center">
                <div className="w-12 h-12 border border-brand-dark dark:border-brand-chalk flex items-center justify-center mx-auto mb-4 text-brand-saffron transition-colors duration-200">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-3xl text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                  Workspace Authentication
                </h1>
                <p className="text-[10px] font-mono uppercase tracking-wider text-brand-dark/50 dark:text-brand-chalk/50 mt-1 transition-colors duration-200">
                  Accessing Restricted NSF Jadavpur Member Portal
                </p>
              </div>

              {/* Security Notice */}
              <div className="bg-brand-dark/5 dark:bg-brand-chalk/5 border border-brand-dark/10 dark:border-brand-chalk/10 p-4 font-mono text-xs max-w-xl mx-auto text-center space-y-1">
                <p className="font-bold text-brand-saffron uppercase text-[10px] tracking-wider flex items-center justify-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-brand-saffron" />
                  <span>Restricted Organization Portal Access</span>
                </p>
                <p className="text-brand-dark/60 dark:text-brand-chalk/60 text-[11px]">
                  Authorized NSF JU personnel only. All access attempts are authenticated, logged, and audited.
                </p>
              </div>

              {/* Stark Side-by-Side Login & Sign Up Forms */}
              <div className="grid md:grid-cols-2 gap-12 items-start pt-4">
                
                {/* Form: Login */}
                <div className="border border-brand-dark dark:border-brand-chalk bg-brand-chalk dark:bg-brand-dark p-8 space-y-6 transition-colors duration-200">
                  <div>
                    <h2 className="font-serif text-xl text-brand-dark dark:text-brand-chalk font-bold transition-colors duration-200">
                      Member Login
                    </h2>
                    <p className="text-[10px] font-mono text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest mt-0.5 transition-colors duration-200">
                      Verify existing credentials
                    </p>
                  </div>

                  {authError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 font-mono text-[11px] font-bold flex items-center gap-2 transition-colors duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                        Member Email ID
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="member@nsfju.org"
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                        Security Password
                      </label>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                    >
                      Authenticate Credentials
                    </button>
                  </form>
                </div>

                {/* Form: Secure Access Registration Request */}
                <div className="border border-brand-dark dark:border-brand-chalk bg-brand-chalk dark:bg-brand-dark p-8 space-y-6 transition-colors duration-200">
                  <div>
                    <h2 className="font-serif text-xl text-brand-dark dark:text-brand-chalk font-bold transition-colors duration-200 flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-brand-saffron" />
                      <span>Request Member Access</span>
                    </h2>
                    <p className="text-[10px] font-mono text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest mt-0.5 transition-colors duration-200">
                      Requires Passcode & Admin Approval
                    </p>
                  </div>

                  {regError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-400 font-mono text-[11px] font-bold flex items-center gap-2 transition-colors duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  {regSuccess && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-2 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{regSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Subir Sen"
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="subir@nsfju.org"
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Secure Password
                        </label>
                        <input
                          type="password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Committee / Cell
                        </label>
                        <select
                          value={regWing}
                          onChange={(e) => setRegWing(e.target.value as Member["wing"])}
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-xs font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        >
                          <option value="Technical Cell" className="dark:bg-brand-dark">Technical Cell</option>
                          <option value="Media Cell" className="dark:bg-brand-dark">Media Cell</option>
                          <option value="Outreach Cell" className="dark:bg-brand-dark">Outreach Cell</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200 flex items-center justify-between">
                        <span>Secret Organization Passcode *</span>
                        <span className="text-[9px] text-brand-dark/40 dark:text-brand-chalk/40 font-normal">Obtain from committee lead</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={regPasscode}
                        onChange={(e) => setRegPasscode(e.target.value)}
                        placeholder="Enter secret org code..."
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2.5 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                    >
                      Submit Registration Request
                    </button>
                  </form>
                </div>

              </div>
            </div>
          ) : (
            /* ==================== AUTHENTICATED STATE ==================== */
            <div className="space-y-10">
              
              {/* Profile Details Banner */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-brand-dark/10 dark:border-brand-chalk/10 transition-colors duration-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 font-bold border border-emerald-200 dark:border-emerald-800/40">
                      Member Session Active
                    </span>
                    <button
                      onClick={logout}
                      className="text-xs font-mono font-bold text-brand-saffron hover:underline flex items-center gap-1.5 ml-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                  <h1 className="text-3xl font-serif tracking-tight text-brand-dark dark:text-brand-chalk transition-colors duration-200">
                    Welcome, {currentUser.name}
                  </h1>
                  <div className="flex gap-4 text-xs font-mono text-brand-dark/60 dark:text-brand-chalk/60 mt-1 transition-colors duration-200">
                    <p>Role: <span className="font-bold text-brand-dark dark:text-brand-chalk transition-colors duration-200">{currentUser.role}</span></p>
                    <p>| Committee: <span className="font-bold text-brand-dark dark:text-brand-chalk transition-colors duration-200">{currentUser.wing}</span></p>
                  </div>
                </div>

                {/* Admin and Committee Head Toolbar */}
                {(currentUser.role === "Admin" || currentUser.role === "Committee Head") && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setShowCreateTask(!showCreateTask);
                        setShowMembers(false);
                      }}
                      className={`px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition-all border border-brand-dark dark:border-brand-chalk flex items-center gap-1.5 cursor-pointer ${
                        showCreateTask
                          ? "bg-brand-dark dark:bg-brand-chalk text-brand-chalk dark:text-brand-dark"
                          : "bg-transparent text-brand-dark dark:text-brand-chalk hover:bg-brand-dark/[0.05] dark:hover:bg-brand-chalk/[0.05]"
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{showCreateTask ? "Close Form" : "Create Task"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMembers(!showMembers);
                        setShowCreateTask(false);
                      }}
                      className={`px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition-all border border-brand-dark dark:border-brand-chalk flex items-center gap-1.5 cursor-pointer relative ${
                        showMembers
                          ? "bg-brand-dark dark:bg-brand-chalk text-brand-chalk dark:text-brand-dark"
                          : "bg-transparent text-brand-dark dark:text-brand-chalk hover:bg-brand-dark/[0.05] dark:hover:bg-brand-chalk/[0.05]"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{showMembers ? "Close Directory" : "Members Directory"}</span>
                      {members.filter((m) => m.status === "Pending").length > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 bg-brand-saffron text-brand-dark text-[9px] font-extrabold rounded-full animate-pulse">
                          {members.filter((m) => m.status === "Pending").length}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Inline Create Task Form */}
              {showCreateTask && (
                <div className="border border-brand-dark dark:border-brand-chalk bg-brand-chalk dark:bg-brand-dark p-8 space-y-6 animate-fade-in max-w-3xl mx-auto transition-colors duration-200">
                  <div className="border-b border-brand-dark/10 dark:border-brand-chalk/10 pb-3 transition-colors duration-200">
                    <h3 className="font-serif text-2xl text-brand-dark dark:text-brand-chalk transition-colors duration-200">Create New Task</h3>
                    <p className="text-[10px] font-mono text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest transition-colors duration-200">
                      Dispatch credentials and actions to committees
                    </p>
                  </div>

                  <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="e.g. Audit Off-Campus Accommodations near 8B"
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        placeholder="Outline parameters and targets for this action..."
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Wing / Cell *
                        </label>
                        <select
                          value={taskWing}
                          onChange={(e) => setTaskWing(e.target.value as Task["wing"])}
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-xs font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        >
                          <option value="Technical Cell" className="dark:bg-brand-dark">Technical Cell</option>
                          <option value="Media Cell" className="dark:bg-brand-dark">Media Cell</option>
                          <option value="Outreach Cell" className="dark:bg-brand-dark">Outreach Cell</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Priority *
                        </label>
                        <select
                          value={taskPriority}
                          onChange={(e) => setTaskPriority(e.target.value as Task["priority"])}
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-xs font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        >
                          <option value="Low" className="dark:bg-brand-dark">Low</option>
                          <option value="Medium" className="dark:bg-brand-dark">Medium</option>
                          <option value="High" className="dark:bg-brand-dark">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Visibility *
                        </label>
                        <select
                          value={taskVisibility}
                          onChange={(e) => setTaskVisibility(e.target.value as Task["visibility"])}
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-xs font-bold font-mono border border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        >
                          <option value="committee" className="dark:bg-brand-dark">👥 Committee Only</option>
                          <option value="private" className="dark:bg-brand-dark">🔒 Private (Admin Only)</option>
                          <option value="public" className="dark:bg-brand-dark">🌍 Public Link</option>
                          <option value="voluntary" className="dark:bg-brand-dark">🙋 Open Volunteer Pool</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                          Est. Duration
                        </label>
                        <input
                          type="text"
                          value={taskDuration}
                          onChange={(e) => setTaskDuration(e.target.value)}
                          placeholder="e.g. 6 Hours"
                          className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-1 transition-colors duration-200">
                        Deadline Target *
                      </label>
                      <input
                        type="date"
                        required
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        className="w-full bg-brand-chalk dark:bg-brand-dark text-brand-dark dark:text-brand-chalk py-2 px-1 text-sm font-semibold border-b border-brand-dark/20 dark:border-brand-chalk/20 transition-colors duration-200"
                      />
                    </div>

                    {taskVisibility !== "voluntary" && (
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase text-brand-dark/60 dark:text-brand-chalk/60 mb-2 transition-colors duration-200">
                          Assign Members *
                        </label>
                        <div className="border border-brand-dark/10 dark:border-brand-chalk/10 p-4 max-h-[120px] overflow-y-auto custom-scrollbar space-y-1.5 bg-brand-chalk dark:bg-brand-dark transition-colors duration-200">
                          {members.map((member) => (
                            <label
                              key={member.email}
                              className="flex items-center gap-2 cursor-pointer py-0.5 hover:bg-brand-sand dark:hover:bg-brand-chalk/10 px-2 font-mono text-xs text-brand-dark/85 dark:text-brand-chalk/85 font-bold transition-colors duration-200"
                            >
                              <input
                                type="checkbox"
                                checked={taskAssignees.includes(member.email)}
                                onChange={(e) =>
                                  handleAssigneeCheckboxChange(member.email, e.target.checked)
                                }
                                className="accent-brand-saffron"
                              />
                              <span>
                                {member.name} ({member.role} • {member.wing})
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-3 pt-3 border-t border-brand-dark/10 dark:border-brand-chalk/10 transition-colors duration-200">
                      <button
                        type="button"
                        onClick={() => setShowCreateTask(false)}
                        className="px-5 py-2 border border-brand-dark/20 dark:border-brand-chalk/20 text-brand-dark/60 dark:text-brand-chalk/60 font-bold font-mono text-xs uppercase hover:text-brand-dark dark:hover:text-brand-chalk"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-bold font-mono text-xs uppercase tracking-wider transition-colors duration-200"
                      >
                        Dispatch Task
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Inline Members Directory */}
              {showMembers && (
                <div className="border border-brand-dark dark:border-brand-chalk bg-brand-chalk dark:bg-brand-dark p-8 space-y-4 animate-fade-in transition-colors duration-200">
                  <div className="border-b border-brand-dark/10 dark:border-brand-chalk/10 pb-3 transition-colors duration-200">
                    <h3 className="font-serif text-2xl text-brand-dark dark:text-brand-chalk transition-colors duration-200">Members Directory</h3>
                    <p className="text-[10px] font-mono text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest transition-colors duration-200">
                      Manage roles, cell affiliations, and account activation states
                    </p>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-brand-dark/20 dark:border-brand-chalk/20 text-brand-dark/50 dark:text-brand-chalk/50 uppercase tracking-widest text-[10px] font-bold transition-colors duration-200">
                          <th className="py-3 px-4">Name & Email</th>
                          <th className="py-3 px-4">Committee Cell</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-dark/5 dark:divide-brand-chalk/5 transition-colors duration-200">
                        {members.map((member) => (
                          <tr key={member.email} className="hover:bg-brand-sand dark:hover:bg-brand-chalk/5 transition-colors duration-200">
                            <td className="py-3 px-4">
                              <p className="font-bold text-brand-dark/85 dark:text-brand-chalk/85 transition-colors duration-200">{member.name}</p>
                              <span className="text-[10px] text-brand-dark/40 dark:text-brand-chalk/40 font-normal transition-colors duration-200">{member.email}</span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={member.wing}
                                onChange={(e) =>
                                  updateMemberWing(member.id, e.target.value as Member["wing"])
                                }
                                className="bg-transparent border-none text-brand-dark/75 dark:text-brand-chalk/75 font-bold uppercase py-1"
                              >
                                <option value="General" className="dark:bg-brand-dark">General</option>
                                <option value="Technical Cell" className="dark:bg-brand-dark">Technical Cell</option>
                                <option value="Media Cell" className="dark:bg-brand-dark">Media Cell</option>
                                <option value="Outreach Cell" className="dark:bg-brand-dark">Outreach Cell</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={member.role}
                                onChange={(e) =>
                                  updateMemberRole(member.id, e.target.value as Member["role"])
                                }
                                className="bg-transparent border-none text-brand-dark/75 dark:text-brand-chalk/75 font-bold uppercase py-1"
                              >
                                <option value="Member" className="dark:bg-brand-dark">Member</option>
                                <option value="Committee Head" className="dark:bg-brand-dark">Committee Head</option>
                                <option value="Admin" className="dark:bg-brand-dark">Admin</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 border font-bold uppercase text-[9px] ${
                                  member.status === "Active"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40"
                                    : member.status === "Pending"
                                    ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/40 animate-pulse"
                                    : "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40"
                                }`}
                              >
                                {member.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {member.status === "Pending" ? (
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    onClick={() => updateMemberStatus(member.id, "Active")}
                                    className="px-2 py-1 bg-emerald-700 text-white hover:bg-emerald-800 text-[9px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <UserCheck className="w-3 h-3" />
                                    <span>Approve</span>
                                  </button>
                                  <button
                                    onClick={() => updateMemberStatus(member.id, "Deactivated")}
                                    className="px-2 py-1 bg-red-700 text-white hover:bg-red-800 text-[9px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <UserX className="w-3 h-3" />
                                    <span>Reject</span>
                                  </button>
                                </div>
                              ) : (
                                <button
                                  disabled={member.email === currentUser.email}
                                  onClick={() => toggleMemberStatus(member.id)}
                                  className={`px-2.5 py-1 border text-[9px] font-bold uppercase transition-all cursor-pointer ${
                                    member.email === currentUser.email
                                      ? "opacity-50 border-brand-dark/10 dark:border-brand-chalk/10 text-brand-dark/25 dark:text-brand-chalk/25 cursor-not-allowed"
                                      : member.status === "Active"
                                      ? "bg-red-50 hover:bg-red-600 hover:text-white border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-400"
                                      : "bg-emerald-50 hover:bg-emerald-600 hover:text-white border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-400"
                                  }`}
                                >
                                  {member.status === "Active" ? "Deactivate" : "Activate"}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Task Board Section */}
              <div className="space-y-4">
                <div className="border-b-2 border-brand-dark dark:border-brand-chalk pb-2 flex justify-between items-center transition-colors duration-200">
                  <h2 className="font-serif text-xl tracking-tight text-brand-dark dark:text-brand-chalk flex items-center gap-2 transition-colors duration-200">
                    <CheckCircle className="w-5 h-5 text-brand-saffron" />
                    <span>Workspace Task Board</span>
                  </h2>
                  <span className="font-mono text-xs text-brand-dark/60 dark:text-brand-chalk/60 font-bold transition-colors duration-200">
                    {visibleTasks.length} Duties Displayed
                  </span>
                </div>

                {visibleTasks.length === 0 ? (
                  <div className="border border-dashed border-brand-dark/20 dark:border-brand-chalk/20 p-12 text-center bg-brand-chalk dark:bg-brand-dark max-w-xl mx-auto my-6 transition-colors duration-200">
                    <AlertCircle className="text-brand-dark/30 dark:text-brand-chalk/30 mx-auto mb-4 w-8 h-8 transition-colors duration-200" />
                    <h3 className="text-md font-serif text-brand-dark dark:text-brand-chalk transition-colors duration-200">No Duties Assigned / Open</h3>
                    <p className="text-brand-dark/60 dark:text-brand-chalk/60 mt-1 text-xs font-mono uppercase tracking-wider font-bold transition-colors duration-200">
                      Your dashboard is currently clear. Join voluntary rallies or wait for delegation.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleTasks.map((task) => {
                      const isHighPriority = task.priority === "High";
                      const isCompleted = task.status === "completed";
                      const isUserAssignee = task.assignee.includes(currentUser.email);
                      const isVoluntary = task.visibility === "voluntary";
                      
                      const hasJoined = task.volunteersJoined?.includes(currentUser.email);

                      return (
                        <div
                          key={task.id}
                          className={`border p-6 flex flex-col justify-between hover:shadow-sm transition-all bg-brand-chalk dark:bg-brand-dark ${
                            isHighPriority && !isCompleted
                              ? "border-brand-saffron"
                              : "border-brand-dark/15 dark:border-brand-chalk/15"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] font-mono border border-brand-dark/15 dark:border-brand-chalk/15 px-2 py-0.5 text-brand-dark/60 dark:text-brand-chalk/60 font-bold uppercase transition-colors duration-200">
                                {task.wing}
                              </span>
                              <span
                                className={`text-[9px] font-mono border uppercase tracking-wider px-2 py-0.5 font-bold transition-colors duration-200 ${
                                  isHighPriority
                                    ? "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40"
                                    : "text-brand-dark/50 dark:text-brand-chalk/50 bg-brand-sand dark:bg-brand-chalk/10 border-brand-dark/5 dark:border-brand-chalk/5"
                                }`}
                              >
                                {task.priority} Priority
                              </span>
                            </div>

                            <div>
                              <h3 className={`font-serif text-lg font-bold leading-tight text-brand-dark dark:text-brand-chalk transition-colors duration-200 ${
                                isCompleted ? "line-through opacity-55" : ""
                              }`}>
                                {task.title}
                              </h3>
                              <p className="text-xs text-brand-dark/70 dark:text-brand-chalk/70 leading-relaxed font-light mt-1.5 transition-colors duration-200">
                                {task.desc}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-brand-dark/5 dark:border-brand-chalk/5 pt-3 mt-4 space-y-3 transition-colors duration-200">
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div>
                                <p className="text-brand-dark/40 dark:text-brand-chalk/40 font-bold transition-colors duration-200">DEADLINE</p>
                                <p className="font-extrabold text-brand-saffron flex items-center gap-1 mt-0.5">
                                  <Calendar className="w-3 h-3" />
                                  <span>{task.deadline}</span>
                                </p>
                              </div>
                              <div>
                                <p className="text-brand-dark/40 dark:text-brand-chalk/40 font-bold transition-colors duration-200">EST. TIME</p>
                                <p className="font-bold text-brand-dark/80 dark:text-brand-chalk/80 mt-0.5 transition-colors duration-200">
                                  <Clock className="w-3 h-3 inline mr-1 text-brand-saffron" />
                                  {task.duration}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-brand-dark/40 dark:text-brand-chalk/40 font-bold mb-0.5 transition-colors duration-200">ASSIGNEES</p>
                                <div className="flex flex-wrap gap-1">
                                  {task.assignee.length === 0 ? (
                                    <span className="text-brand-saffron font-bold">Open Volunteer Pool</span>
                                  ) : (
                                    task.assignee.map((email) => {
                                      const profile = members.find((c) => c.email === email);
                                      return (
                                        <span
                                          key={email}
                                          className="text-[9px] border border-brand-dark/10 dark:border-brand-chalk/10 bg-brand-sand dark:bg-brand-chalk/10 text-brand-dark/70 dark:text-brand-chalk/70 px-1.5 py-0.2 rounded-none font-bold transition-colors duration-200"
                                        >
                                          {profile?.name || email.split("@")[0]}
                                        </span>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-brand-dark/5 dark:border-brand-chalk/5 transition-colors duration-200">
                              {/* Task Action Buttons */}
                              {isCompleted ? (
                                <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 px-3 py-1.5 font-bold transition-colors duration-200">
                                  ✓ Completed Task
                                </span>
                              ) : (
                                <>
                                  {/* Join volunteer task */}
                                  {isVoluntary && !hasJoined && (
                                    <button
                                      onClick={() => joinTask(task.id)}
                                      className="px-4 py-1.5 bg-brand-saffron hover:bg-brand-dark dark:hover:bg-brand-chalk text-brand-chalk dark:text-brand-dark font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                                    >
                                      Join Task
                                    </button>
                                  )}
                                  {isVoluntary && hasJoined && (
                                    <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold uppercase transition-colors duration-200">
                                      ✓ Enlisted
                                    </span>
                                  )}

                                  {/* Complete assigned task */}
                                  {isUserAssignee && (
                                    <button
                                      onClick={() => completeTask(task.id)}
                                      className="px-4 py-1.5 bg-brand-dark dark:bg-brand-chalk hover:bg-brand-saffron dark:hover:bg-brand-saffron text-brand-chalk dark:text-brand-dark dark:hover:text-brand-chalk font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                                    >
                                      Complete
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  );
}
