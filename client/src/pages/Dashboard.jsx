import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Activity, Sparkles } from 'lucide-react';
import ShaderBackground from '../components/ShaderBackground';
import NetworkGraphic from '../components/NetworkGraphic';


function Dashboard() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:5000/api/contacts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setContacts(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };
   
  fetchContacts();
}, []);
  
const totalContacts = contacts.length;

const activeContacts = contacts.filter(
  (contact) => contact.status === 'Active'
).length;

const newContacts = contacts.filter(
  (contact) => contact.status === 'New'
).length;
  
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#DDE9E1]">
      <ShaderBackground />
      
      {/* Navigation */}
   <nav className="relative z-10 border-b border-white/50 bg-[#F7F3EC]/60 backdrop-blur-2xl">
  <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">

    {/* Logo */}
    <Link
      to="/dashboard"
      className="group flex items-center gap-3"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d1d1f] text-sm font-semibold text-white shadow-sm"
      >
        C
      </motion.div>

      <span className="text-lg font-semibold tracking-tight text-[#1d1d1f]">
        ContactFlow
      </span>
    </Link>

    {/* Navigation Links */}
    <div className="flex items-center gap-2">

      {/* Dashboard */}
      <Link
        to="/dashboard"
        className="relative rounded-xl bg-white/50 px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm transition hover:bg-white/70"
      >
        Dashboard
      </Link>

      {/* Contacts */}
      <Link
        to="/contacts"
        className="rounded-xl px-4 py-2 text-sm text-[#6e6e73] transition hover:bg-white/50 hover:text-[#1d1d1f]"
      >
        Contacts
      </Link>

      {/* Divider */}
      <div className="mx-2 h-6 w-px bg-[#d2d2d7]/60" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="rounded-xl border border-[#d2d2d7]/70 bg-white/40 px-4 py-2 text-sm font-medium text-[#1d1d1f] shadow-sm transition hover:bg-white/70 active:scale-[0.98]"
      >
        Log out
      </button>

    </div>
  </div>
        </nav>

      {/* Dashboard content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-[#6e6e73]">
            Overview
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-5xl">
            Your contacts, organized.
          </h1>

          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#6e6e73]">
            Keep track of your connections and manage your relationships in one place.
          </p>
        </motion.div>


      <div className="grid gap-6 sm:grid-cols-3">

  {/* Total Contacts */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 p-7 shadow-[0_12px_40px_rgba(31,38,135,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/65"
  >
    {/* Decorative glow */}
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
<div className="flex items-center justify-between">
  <p className="text-sm font-medium text-[#6e6e73]">
    Total Contacts
  </p>

  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f1ff] text-[#3478f6]">
    <Users size={19} strokeWidth={1.8} />
  </div>
    </div>

      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#1d1d1f]">
        {totalContacts}
      </p>
    </div>
  </motion.div>


  {/* Active */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 p-7 shadow-[0_12px_40px_rgba(31,38,135,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/65"
  >
    {/* Decorative glow */}
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
<div className="flex items-center justify-between">
  <p className="text-sm font-medium text-[#6e6e73]">
    Active
  </p>

  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7ed] text-[#218739]">
    <Activity size={19} strokeWidth={1.8} />
  </div>
   </div>

      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#1d1d1f]">
        {activeContacts}
      </p>
    </div>
  </motion.div>


  {/* New */}
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/55 p-7 shadow-[0_12px_40px_rgba(31,38,135,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/65"
  >
    {/* Decorative glow */}
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl transition-transform duration-500 group-hover:scale-150" />

    <div className="relative">
<div className="flex items-center justify-between">
  <p className="text-sm font-medium text-[#6e6e73]">
    New
  </p>

  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#d86b35]">
    <Sparkles size={19} strokeWidth={1.8} />
  </div>
   </div>

      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#1d1d1f]">
        {newContacts}
      </p>
    </div>
  </motion.div>

</div>

      
        {/* Recent contacts placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]"
        >
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
              Recent contacts
            </h2>

            <Link to="/contacts" className="text-sm font-medium text-[#1d1d1f] underline decoration-[#86868b]/40 underline-offset-4 hover:decoration-[#1d1d1f]">
              View all
            </Link>
         </div>

          <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm">
          {contacts.length === 0 ? (
         <div className="p-6">
      <p className="text-[#6e6e73]">
        No contacts yet.
      </p>
    </div>
  ) : (
    contacts.slice(0, 5).map((contact) => (
      <div
        key={contact._id}
        className="flex items-center justify-between border-b border-[#d2d2d7]/50 px-6 py-5 last:border-b-0"
      >
        <div>
          <p className="font-medium text-[#1d1d1f]">
            {contact.name}
          </p>

          <p className="mt-1 text-sm text-[#6e6e73]">
            {contact.email}
          </p>
        </div>

        <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#6e6e73]">
          {contact.status}
        </span>
      </div>
    
    ))
    )}
      </div>
      </div>
          
          {/* Network Graphic */}
       <div className="lg:mt-[52px]">
        <NetworkGraphic />
          </div>
        </motion.section>
       
      </div>

      
    </main>
  );
}

export default Dashboard;