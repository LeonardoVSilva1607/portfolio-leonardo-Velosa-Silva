import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { trpc } from "@/lib/trpc";

/**
 * Edit Profile Screen - Editar informações do perfil
 */
export default function EditProfileScreen() {
  const { user, loading: authLoading, refresh } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  if (authLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#DC143C" />
      </ScreenContainer>
    );
  }

  if (!user) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground">Você precisa estar autenticado</Text>
        <TouchableOpacity
          className="bg-primary px-8 py-3 rounded-full"
          onPress={() => router.push({ pathname: "/oauth/login" } as any)}
        >
          <Text className="text-white font-semibold">Fazer Login</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao selecionar imagem");
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao tirar foto");
    }
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Aqui você chamaria uma API para atualizar o perfil
      // Por enquanto, apenas mostramos uma mensagem de sucesso
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            refresh();
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", error instanceof Error ? error.message : "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Editar Perfil</Text>
            <Text className="text-muted">Atualize suas informações pessoais</Text>
          </View>

          {/* Profile Picture Section */}
          <View className="gap-3 items-center">
            <View className="w-24 h-24 rounded-full bg-surface border-2 border-primary items-center justify-center overflow-hidden">
              {profileImage ? (
                <Image source={{ uri: profileImage }} className="w-full h-full" />
              ) : (
                <Text className="text-4xl">👤</Text>
              )}
            </View>

            {/* Photo Actions */}
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-lg flex-1"
                onPress={takePhoto}
                disabled={loading}
              >
                <Text className="text-white font-semibold text-center text-sm">Câmera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primary px-4 py-2 rounded-lg flex-1"
                onPress={pickImage}
                disabled={loading}
              >
                <Text className="text-white font-semibold text-center text-sm">Galeria</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            {/* Name Input */}
            <View className="gap-1">
              <Text className="text-foreground font-semibold">Nome Completo</Text>
              <TextInput
                className={`bg-surface border rounded-lg p-3 text-foreground ${
                  errors.name ? "border-error" : "border-border"
                }`}
                placeholder="Seu nome completo"
                placeholderTextColor="#808080"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) {
                    setErrors({ ...errors, name: "" });
                  }
                }}
                editable={!loading}
              />
              {errors.name && <Text className="text-error text-xs">{errors.name}</Text>}
            </View>

            {/* Email Input */}
            <View className="gap-1">
              <Text className="text-foreground font-semibold">Email</Text>
              <TextInput
                className={`bg-surface border rounded-lg p-3 text-foreground ${
                  errors.email ? "border-error" : "border-border"
                }`}
                placeholder="seu@email.com"
                placeholderTextColor="#808080"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors({ ...errors, email: "" });
                  }
                }}
                keyboardType="email-address"
                editable={!loading}
              />
              {errors.email && <Text className="text-error text-xs">{errors.email}</Text>}
            </View>

            {/* User ID (Read-only) */}
            <View className="gap-1">
              <Text className="text-foreground font-semibold">ID do Usuário</Text>
              <View className="bg-surface border border-border rounded-lg p-3">
                <Text className="text-muted">{user.id}</Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            className="bg-primary rounded-lg p-4 items-center"
            onPress={handleSaveProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-lg">Salvar Alterações</Text>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            className="bg-surface border border-border rounded-lg p-4 items-center"
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text className="text-foreground font-semibold">Cancelar</Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-2">
            <Text className="text-foreground font-semibold text-sm">Dica</Text>
            <Text className="text-muted text-xs">
              Suas alterações serão salvas imediatamente. Você pode alterar sua foto, nome e email a qualquer momento.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
