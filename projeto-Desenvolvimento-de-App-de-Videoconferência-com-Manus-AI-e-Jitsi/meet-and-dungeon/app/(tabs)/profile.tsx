import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

/**
 * Profile Screen - Perfil do usuário
 */
export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Carregando...</Text>
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground">Faça login para acessar seu perfil</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <Text className="text-2xl font-bold text-foreground">Perfil</Text>

          {/* User Info */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View>
              <Text className="text-muted text-sm">Nome</Text>
              <Text className="text-foreground font-semibold">{user?.name || "Não definido"}</Text>
            </View>
            <View>
              <Text className="text-muted text-sm">Email</Text>
              <Text className="text-foreground font-semibold">{user?.email || "Não definido"}</Text>
            </View>
            <View>
              <Text className="text-muted text-sm">ID</Text>
              <Text className="text-foreground font-semibold">{user?.id}</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity 
            className="bg-primary rounded-lg p-4 items-center"
            onPress={() => router.push("./edit-profile")}
          >
            <Text className="text-white font-semibold">Editar Perfil</Text>
          </TouchableOpacity>

          {/* Settings */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Configurações</Text>
            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground font-semibold">Preferências</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground font-semibold">Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-foreground font-semibold">Sobre</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}
          <TouchableOpacity 
            className="bg-error rounded-lg p-4 items-center"
            onPress={logout}
          >
            <Text className="text-white font-semibold">Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
