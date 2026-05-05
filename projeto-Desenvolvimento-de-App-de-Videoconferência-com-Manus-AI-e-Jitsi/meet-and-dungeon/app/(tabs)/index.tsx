import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

interface Session {
  id: string;
  name: string;
  campaignName: string;
  date: string;
  time: string;
  participants: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  role: "master" | "player";
  description?: string;
}

/**
 * Home Screen - Dashboard com todas as sessões do usuário
 */
export default function HomeScreen() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "master" | "player">("all");

  useEffect(() => {
    // Simular carregamento de sessões
    setTimeout(() => {
      setSessions([
        {
          id: "1",
          name: "Sessão de RPG",
          campaignName: "Aventura na Floresta",
          date: "Hoje",
          time: "20:00",
          participants: 3,
          status: "in_progress",
          role: "master",
          description: "Uma sessão épica com seus amigos",
        },
        {
          id: "2",
          name: "Aventura na Floresta",
          campaignName: "Campanha Principal",
          date: "Amanhã",
          time: "19:00",
          participants: 4,
          status: "scheduled",
          role: "player",
          description: "Explorar a floresta misteriosa",
        },
        {
          id: "3",
          name: "O Retorno",
          campaignName: "Campanha: O Retorno",
          date: "Sábado",
          time: "18:00",
          participants: 5,
          status: "scheduled",
          role: "master",
          description: "Continuação da campanha",
        },
        {
          id: "4",
          name: "Dungeon Crawler",
          campaignName: "Masmorra Profunda",
          date: "Domingo",
          time: "21:00",
          participants: 3,
          status: "scheduled",
          role: "player",
          description: "Explorar a masmorra",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (authLoading || loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#DC143C" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    // Redirecionar para OAuth automaticamente
    useEffect(() => {
      router.push({ pathname: "/oauth/callback" } as any);
    }, []);
    
    return (
      <ScreenContainer className="items-center justify-center gap-4 p-4">
        <Text className="text-2xl font-bold text-foreground">Redirecionando...</Text>
        <ActivityIndicator size="large" color="#DC143C" />
      </ScreenContainer>
    );
  }

  const filteredSessions = sessions.filter((session) => {
    if (filter === "all") return true;
    return session.role === filter;
  });

  const masterSessions = sessions.filter((s) => s.role === "master");
  const playerSessions = sessions.filter((s) => s.role === "player");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-success";
      case "scheduled":
        return "bg-warning";
      case "completed":
        return "bg-muted";
      case "cancelled":
        return "bg-error";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "Em Andamento";
      case "scheduled":
        return "Agendada";
      case "completed":
        return "Finalizada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Meet & Dungeon</Text>
            <Text className="text-muted">Bem-vindo, {user?.name}!</Text>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center">
              <Text className="text-2xl font-bold text-primary">{masterSessions.length}</Text>
              <Text className="text-muted text-sm">Campanhas como Master</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center">
              <Text className="text-2xl font-bold text-primary">{playerSessions.length}</Text>
              <Text className="text-muted text-sm">Campanhas como Player</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-lg p-4 items-center"
              onPress={() => router.push({ pathname: "/campaign/create" } as any)}
            >
              <Text className="text-white font-semibold">+ Nova Campanha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-surface border border-border rounded-lg p-4 items-center"
              onPress={() => router.push({ pathname: "/campaign/browse" } as any)}
            >
              <Text className="text-foreground font-semibold">Explorar</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 rounded-lg p-3 items-center ${
                filter === "all" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setFilter("all")}
            >
              <Text className={`font-semibold ${filter === "all" ? "text-white" : "text-foreground"}`}>
                Todas ({sessions.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 rounded-lg p-3 items-center ${
                filter === "master" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setFilter("master")}
            >
              <Text className={`font-semibold ${filter === "master" ? "text-white" : "text-foreground"}`}>
                Master ({masterSessions.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 rounded-lg p-3 items-center ${
                filter === "player" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setFilter("player")}
            >
              <Text className={`font-semibold ${filter === "player" ? "text-white" : "text-foreground"}`}>
                Player ({playerSessions.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sessions List */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Suas Sessões</Text>

            {filteredSessions.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center gap-2 border border-border">
                <Text className="text-foreground font-semibold">Nenhuma sessão encontrada</Text>
                <Text className="text-muted text-sm text-center">
                  Crie uma nova campanha ou aguarde convites de amigos
                </Text>
              </View>
            ) : (
              filteredSessions.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  className="bg-surface rounded-lg p-4 border border-border gap-3"
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/session-detail",
                      params: { id: session.id, name: session.name },
                    } as any)
                  }
                >
                  {/* Session Header */}
                  <View className="flex-row justify-between items-start">
                    <View className="gap-1 flex-1">
                      <Text className="text-foreground font-semibold text-base">{session.name}</Text>
                      <Text className="text-muted text-sm">{session.campaignName}</Text>
                    </View>
                    <View
                      className={`rounded-full px-3 py-1 ${getStatusColor(session.status)}`}
                    >
                      <Text className="text-white text-xs font-semibold">
                        {getStatusText(session.status)}
                      </Text>
                    </View>
                  </View>

                  {/* Session Info */}
                  <View className="flex-row gap-4 text-muted text-sm">
                    <Text className="text-muted text-sm">📅 {session.date}</Text>
                    <Text className="text-muted text-sm">🕐 {session.time}</Text>
                    <Text className="text-muted text-sm">👥 {session.participants}</Text>
                    <Text className={`text-xs font-semibold ${session.role === "master" ? "text-primary" : "text-warning"}`}>
                      {session.role === "master" ? "👑 Master" : "⚔️ Player"}
                    </Text>
                  </View>

                  {/* Session Description */}
                  {session.description && (
                    <Text className="text-muted text-sm">{session.description}</Text>
                  )}

                  {/* Action Button */}
                  <TouchableOpacity
                    className={`rounded-lg p-3 items-center ${
                      session.status === "in_progress" ? "bg-primary" : "bg-surface border border-border"
                    }`}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/session-detail",
                        params: { id: session.id, name: session.name },
                      } as any)
                    }
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        session.status === "in_progress" ? "text-white" : "text-foreground"
                      }`}
                    >
                      {session.status === "in_progress" ? "📹 Entrar Agora" : "Ver Detalhes"}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20 gap-2">
            <Text className="text-foreground font-semibold">Dica</Text>
            <Text className="text-muted text-sm">
              Crie uma campanha para reunir seus amigos e começar suas aventuras de RPG!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
