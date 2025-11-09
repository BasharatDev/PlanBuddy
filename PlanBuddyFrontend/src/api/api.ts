import { Plan } from '../types';

const BASE = process.env.EXPO_PUBLIC_API_BASE_URL;
export async function createPlan(goal: string, horizon: Horizon): Promise<Plan> {
    const resp = await fetch(`${BASE}/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, horizon }),
    });
    if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error ?? 'Failed to create plan');
    }
    const data = await resp.json() as Plan;
    // Add completed flag client-side
    data.tasks = data.tasks.map(task => ({ ...task, completed: false }));
    return data;
}