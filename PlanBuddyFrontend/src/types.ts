export type Priority = 'low' | 'medium' | 'high';

export type Task = {
    id: string;
    title: string;
    dueDate: string; // YYYY-MM-DD
    priority: Priority;
    notes?: string;
    emoji?: string;
    completed?: boolean; // Client-side addition for persistence
};

export type Plan = { tasks: Task[] };

export type Horizon = 'today' | 'week';