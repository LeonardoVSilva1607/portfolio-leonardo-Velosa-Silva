import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  members: number;
  role: "master" | "player";
  isPrivate: boolean;
  createdAt: string;
}

/**
 * Campaigns Tab Screen - Listagem de campanhas do usuário
 */
export default function CampaignsScreen() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de campanhas
    setTimeout(() => {
      setCampaigns([
        {
          id: "1",
          name: "Aventura na Floresta",
          description: "Uma épica jornada pela floresta misteriosa",
          members: 4,
          role: "master",
          isPrivate: true,
          createdAt: "2 semanas atrás",
        },
        {
          id: "2",
          name: "Campanha: O Retorno",
          description: "A volta dos heróis para salvar o reino",
          members: 5,
          role: "master",
          isPrivate: true,
          createdAt: "1 mês atrás",
        },
        {
          id: "3",
          name: "Masmorra Profunda",
          description: "Explorar os mistérios da masmorra",
          members: 3,
          role: "player",
          isPrivate: true,
          createdAt: "3 dias atrás",
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
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground">Faça login para acessar campanhas</Text>
        <TouchableOpacity
          className="bg-primary px-8 py-3 rounded-full"
          onPress={() => router.push({ pathname: "/oauth/login" } as any)}
        >
          <Text className="text-white font-semibold">Fazer Login</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-foreground">Campanhas</Text>
            <TouchableOpacity
              className="bg-primary px-4 py-2 rounded-lg"
              onPress={() => router.push({ pathname: "/campaign/create" } as any)}
            >
              <Text className="text-white font-semibold text-sm">+ Nova</Text>
            </TouchableOpacity>
          </View>

          {/* Campaigns List */}
          {campaigns.length === 0 ? (
            <View className="bg-surface rounded-lg p-6 items-center gap-2 border border-border">
              <Text className="text-foreground font-semibold">Nenhuma campanha criada</Text>
              <Text className="text-muted text-sm text-center">
                Crie uma nova campanha para começar suas aventuras
              </Text>
            </View>
          ) : (
            campaigns.map((campaign) => (
              <TouchableOpacity
                key={campaign.id}
                className="bg-surface rounded-lg p-4 border border-border gap-3"
                onPress={() =>
                  router.push({
                    pathname: "/campaign/[id]",
                    params: { id: campaign.id },
                  } as any)
                }
              >
                {/* Campaign Header */}
                <View className="flex-row justify-between items-start">
                  <View className="gap-1 flex-1">
                    <Text className="text-foreground font-semibold text-base">{campaign.name}</Text>
                    <Text className="text-muted text-sm">{campaign.description}</Text>
                  </View>
                  <View
                    className={`rounded-full px-3 py-1 ${
                      campaign.role === "master" ? "bg-primary" : "bg-warning"
                    }`}
                  >
                    <Text className="text-white text-xs font-semibold">
                      {campaign.role === "master" ? "👑 Master" : "⚔️ Player"}
                    </Text>
                  </View>
                </View>

                {/* Campaign Info */}
                <View className="flex-row gap-4">
                  <Text className="text-muted text-sm">👥 {campaign.members} membros</Text>
                  <Text className="text-muted text-sm">
                    {campaign.isPrivate ? "🔒 Privada" : "🌐 Pública"}
                  </Text>
                  <Text className="text-muted text-sm">{campaign.createdAt}</Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  className="bg-primary rounded-lg p-3 items-center mt-2"
                  onPress={() =>
                    router.push({
                      pathname: "/campaign/[id]",
                      params: { id: campaign.id },
                    } as any)
                  }
                >
                  <Text className="text-white font-semibold text-sm">Ver Detalhes</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              className="flex-1 bg-surface border border-border rounded-lg p-4 items-center"
              onPress={() => router.push({ pathname: "/campaign/browse" } as any)}
            >
              <Text className="text-foreground font-semibold">🌐 Explorar</Text>
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <Text className="text-foreground font-semibold">Dica</Text>
            <Text className="text-muted text-sm mt-2">
              Crie uma campanha para reunir seus amigos e começar a aventura
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
