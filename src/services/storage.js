import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites";

export const saveFavorite = async (character) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        const favorites = stored ? JSON.parse(stored) : [];
        // evita duplicados
        if (!favorites.find((item) => item._id === character._id)) {
            favorites.push(character);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    } catch (error) {
        console.error("Erro ao salvar favorito:", error);
    }
};

export const getFavorites = async () => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
        return [];
    }
};

export const removeFavorite = async (id) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        let favorites = stored ? JSON.parse(stored) : [];
        favorites = favorites.filter((item) => item._id !== id);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
    }
};
