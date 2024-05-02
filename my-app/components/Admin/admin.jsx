// components/Admin/admin.jsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import 'tailwindcss/tailwind.css';
import EditUserModal from './EditUserModal';

export default function Admin() {
    const [profiles, setProfiles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();

    useEffect(() => {
        fetchProfiles();
    }, []);

    async function fetchProfiles() {
        try {
            const { data, error } = await supabase.from('profile').select('*');
            if (error) throw error;
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            setError('Failed to fetch profiles. ' + error.message);
        }
        setLoading(false);
    }

    const toggleAdmin = async (profile) => {
        const newAdminStatus = !profile.IsAdmin;
        try {
            const { error } = await supabase.from('profile').update({ IsAdmin: newAdminStatus }).match({ id: profile.id });
            if (error) throw error;
            setMessage(`Admin status for ${profile.first_name} ${profile.last_name} updated.`);
            fetchProfiles(); // Refresh profiles
        } catch (error) {
            console.error('Error updating admin status:', error);
            setError('Failed to update admin status. ' + error.message);
        }
    };

    const deleteUser = async (profile) => {
        if (window.confirm(`Are you sure you want to delete ${profile.first_name} ${profile.last_name}?`)) {
            try {
                const { error } = await supabase.from('profile').delete().match({ id: profile.id });
                if (error) throw error;
                setMessage(`User ${profile.first_name} ${profile.last_name} deleted.`);
                fetchProfiles();
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user. ' + error.message);
            }
        }
    };

    const handleEdit = (profile) => {
        setSelectedUser(profile);
        setEditModalOpen(true);
    };

    const handleSave = async (userId, formData) => {
        try {
            const { error: profileError } = await supabase
                .from('profile')
                .update({ first_name: formData.firstName, last_name: formData.lastName, IsAdmin: formData.isAdmin })
                .eq('id', userId);

            if (profileError) throw profileError;
            setMessage('User updated successfully.');
            fetchProfiles(); // Refresh profiles list
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user. ' + error.message);
        }
    };

    const filteredProfiles = profiles.filter(profile =>
        profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-container p-5 bg-gray-100">
            <h1 className="text-xl font-bold text-center mb-5">ADMIN DASHBOARD</h1>
            {message && <p className="text-green-500 text-center">{message}</p>}
            <input
                type="text"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-full mb-4 border rounded"
            />
            <div className="space-y-4">
                {filteredProfiles.map((profile) => (
                    <div key={profile.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                        <p>{profile.first_name} {profile.last_name} - Admin: {profile.IsAdmin ? 'Yes' : 'No'}</p>
                        <div>
                            <button onClick={() => handleEdit(profile)} className="p-2 rounded bg-blue-500 text-white mr-2">Edit</button>
                            <button onClick={() => toggleAdmin(profile)} className={`p-2 rounded ${profile.IsAdmin ? 'bg-red-500' : 'bg-green-500'} text-white`}>
                                {profile.IsAdmin ? 'Remove Admin' : 'Make Admin'}
                            </button>
                            <button onClick={() => deleteUser(profile)} className="ml-2 p-2 bg-red-600 text-white rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedUser && <EditUserModal user={selectedUser} isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} onSave={handleSave} />}
        </div>
    );
}