import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button } from "react-native";
import { colors, typography, spacing } from "../../styles/global";
import { saveFavorite } from "../../services/storage";

export default function LayoutDetails({ route }) {
    const { character } = route.params;

    const handleFavorite = () => {
        saveFavorite(character);
        alert("Personagem favoritado!");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: character.imageUrl }} style={styles.image} />
            <Text style={typography.title}>{character.name}</Text>
            <Text style={styles.info}>Filmes: {character.films.join(", ") || "N/A"}</Text>
            <Text style={styles.info}>Séries: {character.tvShows.join(", ") || "N/A"}</Text>
            <Text style={styles.info}>Parques: {character.parkAttractions.join(", ") || "N/A"}</Text>
            <View style={{ marginTop: spacing.medium }}>
                <Button title="Favoritar" color={colors.secondary} onPress={handleFavorite} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.large,
        backgroundColor: colors.background,
        paddingBottom: 30,
    },
    image: { width: 200, height: 200, borderRadius: 100, marginBottom: spacing.medium },
    info: { ...typography.body, marginTop: spacing.small },
});
