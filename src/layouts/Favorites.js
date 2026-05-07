import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getFavorites, removeFavorite } from "../services/storage";
import { colors, typography, spacing } from "../styles/global";

export default function Favorites({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const data = await getFavorites();
            setFavorites(data);
        };
        const unsubscribe = navigation.addListener("focus", loadFavorites);
        return unsubscribe;
    }, [navigation]);

    const handleRemove = async (id) => {
        await removeFavorite(id);
        const data = await getFavorites();
        setFavorites(data);
    };

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={typography.body}>Nenhum favorito ainda.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate("Details", { character: item })}>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                <Text style={typography.body}>{item.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item._id)}>
                                <Text style={styles.removeText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, padding: spacing.small },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.medium,
        backgroundColor: colors.white,
        padding: spacing.small,
        borderRadius: 8,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    removeButton: {
        padding: spacing.small,
    },
    removeText: {
        color: "red",
    },
});
