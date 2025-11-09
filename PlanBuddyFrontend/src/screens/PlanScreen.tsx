import React, { useContext } from 'react';
import {
    View, Text, FlatList, TouchableOpacity,
    StyleSheet, StatusBar
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PlanContext } from '../context/PlanContext';
import { Task, Priority } from '../types';

const PlanScreen = () => {
    const { plan, filter, setFilter, toggleComplete } = useContext(PlanContext);

    const filteredTasks = plan?.tasks.filter(task => filter === 'all' || task.priority === filter) || [];

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.taskCard}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
                <Text style={{ fontSize: 18 }}>{item.completed ? '✅' : '⬜'}</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>
                    {item.emoji ? `${item.emoji}  ` : ''}{item.title}
                </Text>

                {item.notes && <Text style={styles.taskNotes}>{item.notes}</Text>}

                <View style={styles.taskFooter}>
                    <Text style={styles.dueText}>Due: {item.dueDate}</Text>
                    <Text style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                        {item.priority.toUpperCase()}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Text style={styles.header}>Your Action Plan ✅</Text>

            {/* Filter Picker */}
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={filter}
                    onValueChange={setFilter}
                    style={styles.picker}
                    itemStyle={{ color: 'white' }}
                >
                    <Picker.Item label="All Tasks" value="all" />
                    <Picker.Item label="Low Priority" value="low" />
                    <Picker.Item label="Medium Priority" value="medium" />
                    <Picker.Item label="High Priority" value="high" />
                </Picker>
            </View>

            {/* Empty State */}
            {!plan || plan.tasks.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No plan created yet 🤔</Text>
                    <Text style={styles.emptySub}>Generate one to see magic happen ✨</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    renderItem={renderTask}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    ListEmptyComponent={<Text style={styles.emptyFilter}>No tasks match this filter</Text>}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case 'low': return '#22c55e';
        case 'medium': return '#f59e0b';
        case 'high': return '#ef4444';
    }
};

export default PlanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 20,
        paddingTop: 30
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center'
    },
    pickerWrapper: {
        backgroundColor: '#1e293b',
        borderRadius: 14,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    picker: {
        color: '#fff'
    },
    taskCard: {
        flexDirection: 'row',
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 16,
        marginBottom: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6
    },
    checkbox: {
        marginRight: 12,
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff'
    },
    taskNotes: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    dueText: {
        color: '#cbd5e1',
        fontSize: 13
    },
    priorityBadge: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        overflow: 'hidden'
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600'
    },
    emptySub: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 6
    },
    emptyFilter: {
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15
    }
});
