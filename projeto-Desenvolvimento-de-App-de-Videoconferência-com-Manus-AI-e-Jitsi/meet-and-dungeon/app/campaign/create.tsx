import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useState } from "react";

/**
 * Create Campaign Screen - Criar nova campanha
 */
export default function CreateCampaignScreen() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPrivate: true,
  });

  if (authLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#DC143C" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground">Faça login para criar uma campanha</Text>
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

    if (!formData.name.trim()) {
      newErrors.name = "Nome da campanha é obrigatório";
    } else if (formData.name.length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Descrição não pode ter mais de 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCampaign = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Simular criação de campanha
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        "Campanha Criada!",
        `A campanha "${formData.name}" foi criada com sucesso!`,
        [
          {
            text: "OK",
            onPress: () => {
              router.push({ pathname: "/campaign/campaigns" } as any);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar campanha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Nova Campanha</Text>
            <Text className="text-muted">Crie uma nova campanha para suas aventuras de RPG</Text>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            {/* Campaign Name */}
            <View className="gap-1">
              <Text className="text-foreground font-semibold">Nome da Campanha *</Text>
              <TextInput
                className={`bg-surface border rounded-lg p-3 text-foreground ${
                  errors.name ? "border-error" : "border-border"
                }`}
                placeholder="Ex: Aventura na Floresta"
                placeholderTextColor="#808080"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (errors.name) {
                    setErrors({ ...errors, name: "" });
                  }
                }}
                editable={!loading}
              />
              {errors.name && <Text className="text-error text-xs">{errors.name}</Text>}
            </View>

            {/* Campaign Description */}
            <View className="gap-1">
              <Text className="text-foreground font-semibold">Descrição</Text>
              <TextInput
                className={`bg-surface border rounded-lg p-3 text-foreground ${
                  errors.description ? "border-error" : "border-border"
                }`}
                placeholder="Descreva sua campanha..."
                placeholderTextColor="#808080"
                value={formData.description}
                onChangeText={(text) => {
                  setFormData({ ...formData, description: text });
                  if (errors.description) {
                    setErrors({ ...errors, description: "" });
                  }
                }}
                multiline
                numberOfLines={4}
                editable={!loading}
              />
              {errors.description && (
                <Text className="text-error text-xs">{errors.description}</Text>
              )}
              <Text className="text-muted text-xs mt-1">
                {formData.description.length}/500 caracteres
              </Text>
            </View>

            {/* Privacy Toggle */}
            <View className="gap-2">
              <Text className="text-foreground font-semibold">Privacidade</Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`flex-1 rounded-lg p-3 items-center border ${
                    formData.isPrivate ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setFormData({ ...formData, isPrivate: true })}
                >
                  <Text className={`font-semibold ${formData.isPrivate ? "text-white" : "text-foreground"}`}>
                    🔒 Privada
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 rounded-lg p-3 items-center border ${
                    !formData.isPrivate ? "bg-primary border-primary" : "bg-surface border-border"
                  }`}
                  onPress={() => setFormData({ ...formData, isPrivate: false })}
                >
                  <Text className={`font-semibold ${!formData.isPrivate ? "text-white" : "text-foreground"}`}>
                    🌐 Pública
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-muted text-xs">
                {formData.isPrivate
                  ? "Apenas convidados podem acessar"
                  : "Qualquer um pode descobrir e pedir para entrar"}
              </Text>
            </View>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20 gap-2">
            <Text className="text-foreground font-semibold">Informações</Text>
            <Text className="text-muted text-sm">
              • Você será o Master da campanha
            </Text>
            <Text className="text-muted text-sm">
              • Poderá convidar amigos para participar
            </Text>
            <Text className="text-muted text-sm">
              • Poderá criar sessões dentro da campanha
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center"
              onPress={handleCreateCampaign}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">Criar Campanha</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface border border-border rounded-lg p-4 items-center"
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text className="text-foreground font-semibold">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
