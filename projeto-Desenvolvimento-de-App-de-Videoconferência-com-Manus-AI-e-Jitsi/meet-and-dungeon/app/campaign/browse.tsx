import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

interface PublicCampaign {
  id: string;
  name: string;
  description: string;
  creatorName: string;
  members: number;
  maxMembers: number;
  createdAt: string;
}

/**
 * Browse Campaigns Screen - Explorar campanhas públicas
 */
export default function BrowseCampaignsScreen() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<PublicCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simular carregamento de campanhas públicas
    setTimeout(() => {
      setCampaigns([
        {
          id: "1",
          name: "Aventura Épica",
          description: "Uma grande aventura para novos e antigos jogadores",
          creatorName: "Master João",
          members: 3,
          maxMembers: 6,
          createdAt: "1 semana atrás",
        },
        {
          id: "2",
          name: "Masmorra Clássica",
          description: "Explore uma masmorra cheia de mistérios",
          creatorName: "Master Maria",
          members: 5,
          maxMembers: 8,
          createdAt: "2 dias atrás",
        },
        {
          id: "3",
          name: "Mundo Aberto",
          description: "Explore um mundo aberto com liberdade total",
          creatorName: "Master Pedro",
          members: 2,
          maxMembers: 5,
          createdAt: "3 horas atrás",
        },
        {
          id: "4",
          name: "Campanha de Mistério",
          description: "Resolva mistérios e descubra segredos",
          creatorName: "Master Ana",
          members: 4,
          maxMembers: 6,
          createdAt: "5 horas atrás",
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
        <Text className="text-foreground">Faça login para explorar campanhas</Text>
      </ScreenContainer>
    );
  }

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Explorar Campanhas</Text>
            <Text className="text-muted">Descubra novas campanhas públicas</Text>
          </View>

          {/* Search Bar */}
          <View className="bg-surface rounded-lg border border-border p-3 flex-row items-center gap-2">
            <Text className="text-muted">🔍</Text>
            <Text className="text-muted">Buscar campanhas...</Text>
          </View>

          {/* Campaigns List */}
          {filteredCampaigns.length === 0 ? (
            <View className="bg-surface rounded-lg p-6 items-center gap-2 border border-border">
              <Text className="text-foreground font-semibold">Nenhuma campanha encontrada</Text>
              <Text className="text-muted text-sm text-center">
                Tente buscar por outro termo ou volte mais tarde
              </Text>
            </View>
          ) : (
            filteredCampaigns.map((campaign) => (
              <View key={campaign.id} className="bg-surface rounded-lg p-4 border border-border gap-3">
                {/* Campaign Header */}
                <View className="gap-1">
                  <Text className="text-foreground font-semibold text-base">{campaign.name}</Text>
                  <Text className="text-muted text-sm">{campaign.description}</Text>
                </View>

                {/* Campaign Info */}
                <View className="flex-row gap-4">
                  <Text className="text-muted text-sm">👤 {campaign.creatorName}</Text>
                  <Text className="text-muted text-sm">
                    👥 {campaign.members}/{campaign.maxMembers}
                  </Text>
                  <Text className="text-muted text-sm">{campaign.createdAt}</Text>
                </View>

                {/* Progress Bar */}
                <View className="bg-muted/20 rounded-full h-2 overflow-hidden">
                  <View
                    className="bg-primary h-full"
                    style={{
                      width: `${(campaign.members / campaign.maxMembers) * 100}%`,
                    }}
                  />
                </View>

                {/* Action Button */}
                <TouchableOpacity
                  className={`rounded-lg p-3 items-center ${
                    campaign.members < campaign.maxMembers
                      ? "bg-primary"
                      : "bg-muted/20 opacity-50"
                  }`}
                  disabled={campaign.members >= campaign.maxMembers}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      campaign.members < campaign.maxMembers ? "text-white" : "text-muted"
                    }`}
                  >
                    {campaign.members < campaign.maxMembers ? "Pedir para Entrar" : "Campanha Cheia"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          {/* Info Card */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <Text className="text-foreground font-semibold">Dica</Text>
            <Text className="text-muted text-sm mt-2">
              Clique em "Pedir para Entrar" para solicitar acesso a uma campanha
            </Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            className="bg-surface border border-border rounded-lg p-4 items-center"
            onPress={() => router.back()}
          >
            <Text className="text-foreground font-semibold">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
