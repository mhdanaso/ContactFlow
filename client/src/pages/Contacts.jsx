import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [contactData, setContactData] = useState({
  name: '',
  email: '',
  phone: '',
  status: 'New',
  notes: '',
});
const handleContactChange = (event) => {
  const { name, value } = event.target;

  setContactData({
    ...contactData,
    [name]: value,
  });
};

const handleAddContact = async (event) => {
  event.preventDefault();

  const isEditing = editingContact !== null;

  setIsAdding(true);
  setFormError('');
  setFormSuccess('');

  try {
    const token = localStorage.getItem('token');

   const response = await fetch(
  isEditing
    ? `http://localhost:5000/api/contacts/${editingContact._id}`
    : 'http://localhost:5000/api/contacts',
  {
    method: isEditing ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  }
);

    const data = await response.json();

  if (!response.ok) {
  setFormError(
    data.message || 'Failed to save contact. Please try again.'
  );
  return;
}

   if (isEditing) {
  setContacts((previousContacts) =>
    previousContacts.map((contact) =>
      contact._id === data._id ? data : contact
    )
  );
} else {
  setContacts((previousContacts) => [
    ...previousContacts,
    data,
  ]);
}

    setContactData({
      name: '',
      email: '',
      phone: '',
      status: 'New',
      notes: '',
    });

    setEditingContact(null);

    setFormSuccess('Contact added successfully.');

    // Close the form after success
    setTimeout(() => {
      setShowForm(false);
      setFormSuccess('');
    }, 1000);

  } catch (error) {
  console.error('Failed to update contact:', error);
  setFormError('Something went wrong. Please try again.');
} finally {
    setIsAdding(false);
  }
};

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
};

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

const filteredContacts = contacts.filter((contact) => {
  const matchesSearch =
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === '' || contact.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const handleDeleteContact = async (contactId) => {
 const confirmed = window.confirm(
    'Are you sure you want to delete this contact?'
  );

  if (!confirmed) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      `http://localhost:5000/api/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
      return;
    }

    // Remove the deleted contact from the React state
    setContacts((previousContacts) =>
      previousContacts.filter(
        (contact) => contact._id !== contactId
      )
    );

    setActiveMenu(null);

  } catch (error) {
    console.error('Failed to delete contact:', error);
  }
};

return (
  <main className="min-h-screen bg-[#f5f5f7]">

    {/* Navigation */}
    <nav className="border-b border-[#d2d2d7]/60 bg-[#f5f5f7]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1d1d1f] text-sm font-semibold text-white">
            C
          </div>

          <span className="text-lg font-semibold tracking-tight text-[#1d1d1f]">
            ContactFlow
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-sm text-[#6e6e73] transition hover:text-[#1d1d1f]"
          >
            Dashboard
          </Link>

          <Link
            to="/contacts"
            className="text-sm font-medium text-[#1d1d1f]"
          >
            Contacts
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-[#d2d2d7] px-3 py-1.5 text-sm font-medium text-[#1d1d1f] transition hover:bg-[#e8e8ed]"
          >
            Log out
          </button>
        </div>

      </div>
    </nav>

    <div className="mx-auto max-w-6xl px-6 py-14">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-medium text-[#6e6e73]">
          Contact management
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-5xl">
          Your contacts.
        </h1>

        <p className="mt-4 text-[17px] text-[#6e6e73]">
          Manage and organize every connection in one place.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
      >
      <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search contacts..."
          className="flex-1 rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[16px] text-[#1d1d1f] outline-none transition focus:border-[#1d1d1f] focus:ring-4 focus:ring-black/5"
      />

        <select
           value={statusFilter}
           onChange={(event) => setStatusFilter(event.target.value)}
           className="rounded-xl border border-[#d2d2d7] bg-white px-4 py-3 text-[16px] text-[#1d1d1f] outline-none"
        >
  <option value="">All statuses</option>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Active">Active</option>
  <option value="Qualified">Qualified</option>
  <option value="Converted">Converted</option>
  <option value="Inactive">Inactive</option>
   </select>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-[#1d1d1f] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-[#2c2c2e]"
        >
         + Add contact
        </button>
      </motion.div>

     {showForm && (
  <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-[#1d1d1f]">
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </h2>

        <p className="mt-1 text-sm text-[#6e6e73]">
          Add a new person to your contacts.
        </p>
      </div>

      <button
        onClick={() =>{setShowForm(false);
          setEditingContact(null);
        }}
        
        className="text-sm text-[#6e6e73] hover:text-[#1d1d1f]"
      >
        Cancel
      </button>
    </div>

    <form
      onSubmit={handleAddContact}
      className="mt-6 grid gap-4 sm:grid-cols-2">
       {formError && (
  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 sm:col-span-2">
    {formError}
  </p>
)}

{formSuccess && (
  <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 sm:col-span-2">
    {formSuccess}
  </p>
)}
      <input
        type="text"
        name="name"
        value={contactData.name}
        onChange={handleContactChange}
        placeholder="Full name"
        className="rounded-xl border border-[#d2d2d7] px-4 py-3 outline-none focus:border-[#1d1d1f]"
      />

      <input
        type="email"
        name="email"
        value={contactData.email}
        onChange={handleContactChange}
        placeholder="Email address"
        className="rounded-xl border border-[#d2d2d7] px-4 py-3 outline-none focus:border-[#1d1d1f]"
      />

      <input
        type="text"
        name="phone"
        value={contactData.phone}
        onChange={handleContactChange}
        placeholder="Phone number"
        className="rounded-xl border border-[#d2d2d7] px-4 py-3 outline-none focus:border-[#1d1d1f]"
      />

     <select
         name="status"
         value={contactData.status}
         onChange={handleContactChange}
         className="rounded-xl border border-[#d2d2d7] px-4 py-3 outline-none focus:border-[#1d1d1f]"
       >
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Active">Active</option>
  <option value="Qualified">Qualified</option>
  <option value="Converted">Converted</option>
  <option value="Inactive">Inactive</option>
      </select>

     <textarea
      name="notes"
      value={contactData.notes}
      onChange={handleContactChange}
      placeholder="Notes (optional)"
      className="min-h-28 rounded-xl border border-[#d2d2d7] px-4 py-3 outline-none focus:border-[#1d1d1f] sm:col-span-2"
     />

      <button
        type="submit"
        disabled={isAdding}
        className="rounded-xl bg-[#1d1d1f] px-5 py-3 font-medium text-white transition hover:bg-[#2c2c2e] sm:col-span-2"
      >
        {isAdding
           ? (editingContact ? 'Saving...' : 'Adding...')
           : (editingContact ? 'Save changes' : 'Add contact')}
      </button>
    </form>
  </div>
)}


      {/* Contacts list */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm"
      >
        {filteredContacts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#6e6e73]">
              No contacts found.
            </p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
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

              <div className="flex items-center gap-4">
                <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-medium text-[#6e6e73]">
                  {contact.status}
                </span>

                <div className="relative">
   <button
    onClick={() =>
      setActiveMenu(
        activeMenu === contact._id ? null : contact._id
      )
    }
    className="text-lg text-[#6e6e73] transition hover:text-[#1d1d1f]"
  >
    •••
  </button>

  {activeMenu === contact._id && (
    <div className="absolute right-0 top-8 z-10 w-36 rounded-xl border border-[#d2d2d7] bg-white p-1 shadow-lg">
     <button
  onClick={() => {
    setEditingContact(contact);
    setContactData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      status: contact.status,
      notes: contact.notes || '',
    });
    setShowForm(true);
    setActiveMenu(null);
  }}
  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#1d1d1f] hover:bg-[#f5f5f7]"
>
  Edit contact
</button>

     <button
  onClick={() => handleDeleteContact(contact._id)}
  className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
  Delete contact
    </button>

        <button
      onClick={() => setActiveMenu(null)}
      className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#6e6e73] hover:bg-[#f5f5f7]"
    >
      Cancel
    </button>

    </div>
  )}
</div>
              </div>
            </div>
          ))
        )}
      </motion.div>

    </div>
  </main>
);
}

export default Contacts;