import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet, TextInput, Button } from "react-native";
import api from "../services/api";
import { colors, typography, spacing } from "../styles/global";

export default function Home({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Busca inicial
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

    // Busca dinâmica conforme digita
    const handleSearch = async (text) => {
        setSearchTerm(text);
        if (text.length > 2) {
            try {
                const response = await api.get(`/character?name=${text}`);
                setCharacters(response.data.data);
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={colors.secondary} style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            {/* SearchBar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar personagem..."
                placeholderTextColor={colors.text}
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <View style={styles.favoritesButton}>
                <Button title="Ir para Favoritos" color={colors.secondary} onPress={() => navigation.navigate("Favorites")} />
            </View>

            {/* Lista de personagens */}
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
    container: { flex: 1, backgroundColor: colors.background, padding: spacing.small },
    searchBar: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.small,
        marginBottom: spacing.medium,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    favoritesButton: {
        marginBottom: spacing.medium,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.medium,
        backgroundColor: colors.white,
        padding: spacing.small,
        borderRadius: 8,
    },
    image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
});
