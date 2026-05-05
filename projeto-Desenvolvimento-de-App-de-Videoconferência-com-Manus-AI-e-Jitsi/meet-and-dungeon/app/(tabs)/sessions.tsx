import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

/**
 * Sessions Screen - Gerenciamento de sessões
 */
export default function SessionsScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

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
        <Text className="text-foreground">Faça login para acessar sessões</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-foreground">Sessões</Text>
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold text-sm">+ Nova</Text>
            </TouchableOpacity>
          </View>

          {/* Session Example Card */}
          <TouchableOpacity
            className="bg-surface rounded-lg p-4 border border-border gap-3"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/session-detail",
                params: { id: "1", name: "Sessão de RPG" },
              } as any)
            }
          >
            <View className="flex-row justify-between items-start">
              <View className="gap-1 flex-1">
                <Text className="text-foreground font-semibold">Sessão de RPG</Text>
                <Text className="text-muted text-sm">Hoje • 20:00</Text>
              </View>
              <View className="bg-success rounded-full w-3 h-3" />
            </View>

            <Text className="text-muted text-xs">3 participantes • Em andamento</Text>

            {/* Video Conference Button */}
            <TouchableOpacity
              className="bg-primary rounded-lg p-3 mt-2 items-center"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/session-detail",
                  params: { id: "1", name: "Sessão de RPG" },
                } as any)
              }
            >
              <Text className="text-white font-semibold text-sm">📹 Entrar na Videoconferência</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Upcoming Sessions */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Próximas Sessões</Text>

            {/* Session Card 2 */}
            <View className="bg-surface rounded-lg p-4 border border-border gap-2">
              <View className="flex-row justify-between items-start">
                <View className="gap-1 flex-1">
                  <Text className="text-foreground font-semibold">Aventura na Floresta</Text>
                  <Text className="text-muted text-sm">Amanhã • 19:00</Text>
                </View>
                <View className="bg-warning rounded-full w-3 h-3" />
              </View>
              <Text className="text-muted text-xs">4 participantes • Agendada</Text>
            </View>

            {/* Session Card 3 */}
            <View className="bg-surface rounded-lg p-4 border border-border gap-2">
              <View className="flex-row justify-between items-start">
                <View className="gap-1 flex-1">
                  <Text className="text-foreground font-semibold">Campanha: O Retorno</Text>
                  <Text className="text-muted text-sm">Sábado • 18:00</Text>
                </View>
                <View className="bg-warning rounded-full w-3 h-3" />
              </View>
              <Text className="text-muted text-xs">5 participantes • Agendada</Text>
            </View>
          </View>

          {/* Features Info */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20 gap-2">
            <Text className="text-foreground font-semibold">Recursos de Sessão</Text>
            <Text className="text-muted text-sm">✓ Videoconferência com Jitsi Meet</Text>
            <Text className="text-muted text-sm">✓ Compartilhamento de tela</Text>
            <Text className="text-muted text-sm">✓ Chat integrado</Text>
            <Text className="text-muted text-sm">✓ Mapas virtuais</Text>
            <Text className="text-muted text-sm">✓ Gravação de sessão</Text>
          </View>

          {/* Tip Card */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-2">
            <Text className="text-foreground font-semibold text-sm">Dica</Text>
            <Text className="text-muted text-sm">
              Clique em uma sessão para ver detalhes e iniciar a videoconferência com seus amigos.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
