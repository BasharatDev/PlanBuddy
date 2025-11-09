import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plan, Task, Priority } from '../types';
import { createPlan } from '../api/api';

type Filter = 'all' | Priority;

interface PlanContextType {
    plan: Plan | null;
    loading: boolean;
    error: string | null;
    filter: Filter;
    setFilter: (filter: Filter) => void;
    generatePlan: (goal: string, horizon: 'today' | 'week') => Promise<void>;
    toggleComplete: (id: string) => void;
}

export const PlanContext = createContext<PlanContextType>({
    plan: null,
    loading: false,
    error: null,
    filter: 'all',
    setFilter: () => { },
    generatePlan: async () => { },
    toggleComplete: () => { },
});

export const PlanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState<boolean>(false);     // ← FIXED
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() => {
        loadPlan();
    }, []);

    const loadPlan = async () => {
        try {
            const stored = await AsyncStorage.getItem('plan');
            if (stored) {
                setPlan(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load plan', e);
        }
    };

    const savePlan = async (newPlan: Plan) => {
        try {
            await AsyncStorage.setItem('plan', JSON.stringify(newPlan));
            setPlan(newPlan);
        } catch (e) {
            console.error('Failed to save plan', e);
        }
    };

    const generatePlan = async (goal: string, horizon: 'today' | 'week') => {
        setLoading(true);           // ← boolean
        setError(null);
        try {
            const newPlan = await createPlan(goal, horizon);
            savePlan(newPlan);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);        // ← boolean
        }
    };

    const toggleComplete = (id: string) => {
        if (!plan) return;
        const updatedTasks = plan.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        savePlan({ tasks: updatedTasks });
    };

    return (
        <PlanContext.Provider value={{ plan, loading, error, filter, setFilter, generatePlan, toggleComplete }}>
            {children}
        </PlanContext.Provider>
    );
};