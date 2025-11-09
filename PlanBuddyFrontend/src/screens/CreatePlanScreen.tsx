import React, { useState, useContext } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ActivityIndicator, StyleSheet, StatusBar
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { PlanContext } from '../context/PlanContext';

const CreatePlanScreen = () => {
    const [goal, setGoal] = useState('');
    const [horizon, setHorizon] = useState<'today' | 'week'>('today');
    const { generatePlan, loading, error } = useContext(PlanContext);
    const navigation = useNavigation();

    const handleGenerate = async () => {
        if (!goal.trim()) {
            alert("Please enter your goal first!")
            return;
        }
        await generatePlan(goal, horizon);
        navigation.navigate('Plan');
        setGoal('')

    };
    const handleRecent = async () => {

        navigation.navigate('Plan');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Plan Your Goal 🚀</Text>
                <Text style={styles.subtitle}>Let AI break it into actionable steps</Text>
            </View>

            {/* Card Container */}
            <View style={styles.card}>

                <Text style={styles.label}>What do you want to achieve?</Text>
                <TextInput
                    style={styles.input}
                    value={goal}
                    onChangeText={setGoal}
                    placeholder="e.g., Launch my online store"
                    placeholderTextColor="#94a3b8"
                />

                <Text style={styles.label}>Time Horizon</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={horizon}
                        onValueChange={(itemValue) => setHorizon(itemValue)}
                        style={styles.picker}
                        itemStyle={{ color: 'white' }}

                    >
                        <Picker.Item label="Today" value="today" />
                        <Picker.Item label="This Week" value="week" />
                    </Picker>
                </View>

                {/* Generate Button */}
                <TouchableOpacity style={styles.button} onPress={handleGenerate} disabled={loading}>
                    <Text style={styles.buttonText}>Generate Plan ✨</Text>
                </TouchableOpacity>
                {/* Recent Button */}
                <TouchableOpacity style={[styles.button, { backgroundColor: "#0f979a" }]} onPress={handleRecent} disabled={loading}>
                    <Text style={styles.buttonText}>Recent Plan ✨</Text>
                </TouchableOpacity>

                {error && <Text style={styles.error}>{error}</Text>}
            </View>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', marginTop: 10 }}>Creating your plan...</Text>
                </View>
            )}
        </View>
    );
};

export default CreatePlanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        paddingHorizontal: 22,
        justifyContent: 'center'
    },
    header: {
        marginBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 6
    },
    subtitle: {
        fontSize: 15,
        color: '#cbd5e1'
    },
    card: {
        backgroundColor: '#1e293b',
        padding: 22,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8
    },
    label: {
        fontSize: 14,
        color: '#e2e8f0',
        marginBottom: 8,
        marginTop: 4,
        fontWeight: '500'
    },
    input: {
        backgroundColor: '#334155',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#fff',
        marginBottom: 18
    },
    pickerWrapper: {
        backgroundColor: '#334155',
        borderRadius: 12,
        marginBottom: 22
    },
    picker: {
        color: '#fff'
    },
    button: {
        backgroundColor: '#6366f1',
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#6366f1',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 6
    },
    buttonText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '600'
    },
    error: {
        color: '#ef4444',
        marginTop: 12,
        textAlign: 'center'
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.78)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
