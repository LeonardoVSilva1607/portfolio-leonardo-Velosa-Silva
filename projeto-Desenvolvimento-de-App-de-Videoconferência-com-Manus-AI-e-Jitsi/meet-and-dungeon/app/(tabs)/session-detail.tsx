import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { JitsiVideoConference } from "@/components/jitsi-video-conference";

/**
 * Session Detail Screen - Detalhes da sessão e videoconferência
 */
export default function SessionDetailScreen() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [isVideoConferenceActive, setIsVideoConferenceActive] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = params.id as string || "1";
  const sessionName = params.name as string || "Sessão de RPG";

  useEffect(() => {
    // Simular carregamento de dados da sessão
    setTimeout(() => {
      setSessionData({
        id: sessionId,
        name: sessionName,
        date: new Date().toLocaleDateString("pt-BR"),
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        description: "Uma sessão épica de RPG com seus amigos",
        participants: [
          { id: 1, name: user?.name || "Você", role: "Master" },
          { id: 2, name: "Jogador 1", role: "Jogador" },
          { id: 3, name: "Jogador 2", role: "Jogador" },
        ],
        status: "em_andamento",
      });
      setLoading(false);
    }, 500);
  }, [sessionId, sessionName, user?.name]);

  if (authLoading || loading) {
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

  if (isVideoConferenceActive) {
    return (
      <JitsiVideoConference
        roomName={`meet-dungeon-${sessionId}`}
        sessionName={sessionName}
        onEndCall={() => setIsVideoConferenceActive(false)}
      />
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">{sessionData?.name}</Text>
            <Text className="text-muted">ID: {sessionData?.id}</Text>
          </View>

          {/* Session Info Card */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="text-foreground font-semibold">Informações da Sessão</Text>
            
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-muted">Data:</Text>
                <Text className="text-foreground font-semibold">{sessionData?.date}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted">Hora:</Text>
                <Text className="text-foreground font-semibold">{sessionData?.time}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-muted">Status:</Text>
                <Text className="text-primary font-semibold">
                  {sessionData?.status === "em_andamento" ? "Em Andamento" : "Agendada"}
                </Text>
              </View>
            </View>

            <Text className="text-muted text-sm">{sessionData?.description}</Text>
          </View>

          {/* Participants */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <Text className="text-foreground font-semibold">Participantes ({sessionData?.participants?.length})</Text>
            
            {sessionData?.participants?.map((participant: any) => (
              <View key={participant.id} className="flex-row items-center justify-between py-2 border-b border-border last:border-b-0">
                <View className="gap-1">
                  <Text className="text-foreground font-semibold">{participant.name}</Text>
                  <Text className="text-muted text-xs">{participant.role}</Text>
                </View>
                <View className="w-3 h-3 rounded-full bg-success" />
              </View>
            ))}
          </View>

          {/* Video Conference Section */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary gap-3">
            <Text className="text-foreground font-semibold">Videoconferência</Text>
            <Text className="text-muted text-sm">
              Clique no botão abaixo para iniciar a videoconferência com Jitsi Meet. Você poderá controlar câmera, microfone e compartilhar sua tela.
            </Text>
            
            <TouchableOpacity
              className="bg-primary rounded-lg p-4 items-center"
              onPress={() => setIsVideoConferenceActive(true)}
            >
              <Text className="text-white font-semibold text-lg">Iniciar Videoconferência</Text>
            </TouchableOpacity>
          </View>

          {/* Session Controls */}
          <View className="gap-3">
            <TouchableOpacity
              className="bg-surface border border-border rounded-lg p-4 items-center"
              onPress={() => router.back()}
            >
              <Text className="text-foreground font-semibold">Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
