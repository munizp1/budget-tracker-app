'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client"; // Ensure this is the correct path
import { fetchGoals, addGoal, updateGoal, deleteGoal } from '../../lib/dbfunctions';
import './style.css';

const supabase = createClient();

function App() {
    const [goals, setGoals] = useState([]);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalAmount, setNewGoalAmount] = useState('');
    const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
    const [showAddFundsModal, setShowAddFundsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [addAmount, setAddAmount] = useState('');
    const [modalGoalId, setModalGoalId] = useState(null);
    const [modalGoalName, setModalGoalName] = useState('');

    useEffect(() => {
        const loadGoals = async () => {
            try {
                const data = await fetchGoals(supabase);
                setGoals(data);
            } catch (error) {
                console.error('Error fetching goals:', error.message);
            }
        };
        loadGoals();
    }, []);

    const handleAddNewGoal = async (e) => {
        e.preventDefault();
    
        const goalData = {
            name: newGoalName,
            amount: parseFloat(newGoalAmount),
            currentAmount: editId ? goals.find(goal => goal.id === editId).currentAmount : 0
        };
    
        try {
            if (editId) {
                // Update an existing goal
                goalData.id = editId;
                const updatedGoals = await updateGoal(supabase, goalData);
                setGoals(updatedGoals);
            } else {
                // Create a new goal
                const addedGoals = await addGoal(supabase, goalData);
                setGoals(prevGoals => [...prevGoals, ...addedGoals]);
            }
    
            // Clear form fields and close modal
            setNewGoalName('');
            setNewGoalAmount('');
            setShowCreateGoalModal(false);
            setEditId(null);
    
            // Refresh the page after creating or editing a goal
            window.location.reload();
        } catch (error) {
            console.error('Failed to add/update goal:', error.message);
            // Optionally, handle the error more gracefully in UI
        }
    };
    
    
    const toggleCreateGoalModal = () => {
        setEditId(null); // Ensure editId is reset to null when creating a new goal
        setNewGoalName('');
        setNewGoalAmount('');
        setShowCreateGoalModal(!showCreateGoalModal);
    };

    const openEditGoal = (goal) => {
        setEditId(goal.id);
        setNewGoalName(goal.name);
        setNewGoalAmount(goal.amount.toString());
        setShowCreateGoalModal(true);
    };

    const handleAddFunds = async (e) => {
        e.preventDefault();
        const updatedGoal = {
            id: modalGoalId,
            currentAmount: goals.find(goal => goal.id === modalGoalId).currentAmount + parseFloat(addAmount)
        };
        try {
            await updateGoal(supabase, updatedGoal);
            const updatedGoals = goals.map(goal => goal.id === modalGoalId ? {...goal, currentAmount: updatedGoal.currentAmount} : goal);
            setGoals(updatedGoals);
            setShowAddFundsModal(false);
            setAddAmount('');
        } catch (error) {
            console.error('Failed to add funds:', error.message);
        }
    };

    const handleDeleteGoal = async () => {
        try {
            await deleteGoal(supabase, modalGoalId);
            setGoals(goals.filter(goal => goal.id !== modalGoalId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Failed to delete goal:', error.message);
        }
    };

    const handleEditGoal = async (e) => {
        e.preventDefault();
        const updatedGoal = {
            id: editId,
            name: newGoalName,
            amount: parseFloat(newGoalAmount),
            currentAmount: goals.find(goal => goal.id === editId).currentAmount // Preserving the currentAmount
        };
        try {
            await updateGoal(supabase, updatedGoal);
            const updatedGoals = goals.map(goal => goal.id === editId ? updatedGoal : goal);
            setGoals(updatedGoals);
            setEditId(null);
            setNewGoalName('');
            setNewGoalAmount('');
            setShowCreateGoalModal(false);
        } catch (error) {
            console.error('Failed to update goal:', error.message);
        }
    };

    const openAddFundsModal = (id, name) => {
        setModalGoalId(id);
        setModalGoalName(name);
        setShowAddFundsModal(true);
    };

    const openDeleteModal = (id, name) => {
        setModalGoalId(id);
        setModalGoalName(name);
        setShowDeleteModal(true);
    };

    return (
        <div className="container">
            <h1 className="header-title">Saving Goals</h1>
            <button onClick={toggleCreateGoalModal} className="create-goal-btn">Create Goal</button>
    
            {/* Modal for Creating or Editing Goals */}
            {showCreateGoalModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowCreateGoalModal(false)}>&times;</span>
                        <h2>Create New Goal</h2>
                        <form onSubmit={handleAddNewGoal}>
                            <div className="form-field">
                                <label htmlFor="goalName">Goal Name:</label>
                                <input
                                    id="goalName"
                                    type="text"
                                    value={newGoalName}
                                    onChange={(e) => setNewGoalName(e.target.value)}
                                    placeholder="Enter goal name"
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="goalAmount">Goal Amount:</label>
                                <input
                                    id="goalAmount"
                                    type="number"
                                    value={newGoalAmount}
                                    onChange={(e) => setNewGoalAmount(e.target.value)}
                                    placeholder="Enter goal amount"
                                    required
                                />
                            </div>
                            <button type="submit">Add Goal</button>
                        </form>
                    </div>
                </div>
            )}

            {/* List of Goals */}
            <ul className="goal-list">
                {goals.map(goal => (
                    <li key={goal.id} className="goal-item">
                        {goal.name} - ${goal.currentAmount.toFixed(2)} / ${goal.amount.toFixed(2)}
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${Math.min(100, (goal.currentAmount / goal.amount) * 100)}%` }}>
                                ${goal.currentAmount.toFixed(2)} / ${goal.amount.toFixed(2)}
                            </div>
                        </div>
                        <button onClick={() => openAddFundsModal(goal.id, goal.name)} className="add-funds-btn">Add Funds</button>
                        <button onClick={() => openEditGoal(goal)} className="edit-btn">Edit Goal</button>
                        <button onClick={() => openDeleteModal(goal.id, goal.name)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
    
            {/* Modal for Adding Funds */}
            {showAddFundsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddFundsModal(false)}>&times;</span>
                        <h2>Add Funds to {modalGoalName}</h2>
                        <form onSubmit={handleAddFunds}>
                            <input
                                type="number"
                                value={addAmount}
                                onChange={(e) => setAddAmount(e.target.value)}
                                placeholder="Amount to Add"
                                autoFocus
                                required
                            />
                            <button type="submit">Add Funds</button>
                        </form>
                    </div>
                </div>
            )}
    
            {/* Modal for Confirming Deletion */}
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                        <h2>Are you sure you want to delete {modalGoalName}?</h2>
                        <button onClick={handleDeleteGoal} className="modal-delete-btn">Delete</button>
                        <button onClick={() => setShowDeleteModal(false)} className="modal-cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default App;