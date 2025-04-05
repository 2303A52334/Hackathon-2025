import React, { useState } from 'react';
import { 
  Beaker, 
  BookOpen, 
  Brain, 
  Building2, 
  BarChart as ChartBar,
  FileText, 
  GraduationCap, 
  LayoutDashboard, 
  LightbulbIcon, 
  Scale,
  Users,
  X 
} from 'lucide-react';

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type Project = {
  id: string;
  name: string;
  investigator: string;
  status: 'active' | 'completed' | 'pending';
  description: string;
  startDate: string;
};

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'research' | 'patent' | 'startup';
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'research', title: 'Research Projects', icon: <Beaker className="w-5 h-5" /> },
  { id: 'ipr', title: 'IPR Management', icon: <Scale className="w-5 h-5" /> },
  { id: 'innovation', title: 'Innovation Hub', icon: <LightbulbIcon className="w-5 h-5" /> },
  { id: 'startups', title: 'Startups', icon: <Building2 className="w-5 h-5" /> },
  { id: 'resources', title: 'Resources', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'analytics', title: 'Analytics', icon: <ChartBar className="w-5 h-5" /> }
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Smart Agriculture System',
    investigator: 'Dr. Patel',
    status: 'active',
    description: 'AI-powered system for crop yield optimization',
    startDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Renewable Energy Storage',
    investigator: 'Dr. Shah',
    status: 'pending',
    description: 'Advanced battery technology research',
    startDate: '2024-02-01'
  }
];

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'New Research Project Registered',
    description: 'AI-based crop yield prediction system',
    time: '2 hours ago',
    type: 'research'
  },
  {
    id: '2',
    title: 'Patent Granted',
    description: 'Smart irrigation control system',
    time: '5 hours ago',
    type: 'patent'
  },
  {
    id: '3',
    title: 'Startup Milestone Achieved',
    description: 'EcoTech Solutions secured Series A funding',
    time: '1 day ago',
    type: 'startup'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    investigator: '',
    description: '',
    status: 'pending',
    startDate: new Date().toISOString().split('T')[0]
  });

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.investigator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: (projects.length + 1).toString(),
      name: newProject.name || '',
      investigator: newProject.investigator || '',
      status: newProject.status as 'active' | 'completed' | 'pending',
      description: newProject.description || '',
      startDate: newProject.startDate || new Date().toISOString().split('T')[0]
    };

    setProjects([...projects, project]);
    setActivities([
      {
        id: (activities.length + 1).toString(),
        title: 'New Research Project Registered',
        description: project.name,
        time: 'Just now',
        type: 'research'
      },
      ...activities
    ]);
    setShowAddProject(false);
    setNewProject({
      name: '',
      investigator: '',
      description: '',
      status: 'pending',
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    setActivities([
      {
        id: (activities.length + 1).toString(),
        title: 'Project Deleted',
        description: projects.find(p => p.id === id)?.name || '',
        time: 'Just now',
        type: 'research'
      },
      ...activities
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Gujarat RIMS</h1>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Overview Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Active Research Projects"
                value={projects.filter(p => p.status === 'active').length.toString()}
                icon={<Beaker className="w-6 h-6 text-blue-600" />}
              />
              <StatCard
                title="Patent Applications"
                value="156"
                icon={<FileText className="w-6 h-6 text-green-600" />}
              />
              <StatCard
                title="Registered Startups"
                value="892"
                icon={<Building2 className="w-6 h-6 text-purple-600" />}
              />
              <StatCard
                title="Active Researchers"
                value={projects.length.toString()}
                icon={<Users className="w-6 h-6 text-orange-600" />}
              />
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    icon={
                      activity.type === 'research' ? (
                        <Beaker className="w-5 h-5 text-blue-600" />
                      ) : activity.type === 'patent' ? (
                        <Scale className="w-5 h-5 text-green-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'research' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Research Projects</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-64"
                  />
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add New Project
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Project Name</th>
                        <th className="text-left py-3">Principal Investigator</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Start Date</th>
                        <th className="text-left py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="border-b">
                          <td className="py-3">{project.name}</td>
                          <td>{project.investigator}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded ${
                                project.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : project.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </span>
                          </td>
                          <td>{project.startDate}</td>
                          <td>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New Project</h3>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddProject}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                      type="text"
                      required
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Principal Investigator
                    </label>
                    <input
                      type="text"
                      required
                      value={newProject.investigator}
                      onChange={(e) => setNewProject({ ...newProject, investigator: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      required
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          status: e.target.value as 'active' | 'completed' | 'pending'
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProject(false)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function ActivityItem({
  title,
  description,
  time,
  icon,
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="bg-gray-50 p-2 rounded-lg">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

export default App;