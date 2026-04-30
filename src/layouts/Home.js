import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import api from "../services/api";
import { colors, typography, spacing } from "../styles/global";

export default function Home({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await api.get("/character");
                setCharacters(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar personagens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color={colors.secondary} style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Details", { character: item })}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            <Text style={typography.body}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    card: {
        flexDirection: "row",
        alignItems: "center",
        margin: spacing.medium,
        backgroundColor: colors.white,
        padding: spacing.small,
        borderRadius: 8,
    },
    image: { width: 60, height: 60, borderRadius: 30 },
});
