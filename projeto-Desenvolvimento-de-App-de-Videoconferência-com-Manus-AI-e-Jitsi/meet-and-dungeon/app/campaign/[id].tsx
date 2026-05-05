import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

interface CampaignMember {
  id: string;
  name: string;
  email: string;
  role: "master" | "player";
  joinedAt: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  createdAt: string;
  members: CampaignMember[];
  sessions: number;
}

/**
 * Campaign Detail Screen - Detalhes e gerenciamento da campanha
 */
export default function CampaignDetailScreen() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const campaignId = params.id as string || "1";

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    // Simular carregamento de dados da campanha
    setTimeout(() => {
      setCampaign({
        id: campaignId,
        name: "Aventura na Floresta",
        description: "Uma épica jornada pela floresta misteriosa",
        isPrivate: true,
        createdAt: "2 semanas atrás",
        sessions: 5,
        members: [
          {
            id: "1",
            name: user?.name || "Você",
            email: user?.email || "seu@email.com",
            role: "master",
            joinedAt: "Criador",
          },
          {
            id: "2",
            name: "Jogador 1",
            email: "jogador1@email.com",
            role: "player",
            joinedAt: "2 semanas atrás",
          },
          {
            id: "3",
            name: "Jogador 2",
            email: "jogador2@email.com",
            role: "player",
            joinedAt: "1 semana atrás",
          },
          {
            id: "4",
            name: "Jogador 3",
            email: "jogador3@email.com",
            role: "player",
            joinedAt: "3 dias atrás",
          },
        ],
      });
      setIsMaster(true);
      setLoading(false);
    }, 500);
  }, [campaignId, user?.name, user?.email]);

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
      </ScreenContainer>
    );
  }

  if (!campaign) {
    return (
      <ScreenContainer className="items-center justify-center gap-4">
        <Text className="text-foreground">Campanha não encontrada</Text>
        <TouchableOpacity
          className="bg-primary px-8 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Voltar</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const handleInvitePlayer = () => {
    Alert.prompt(
      "Convidar Jogador",
      "Digite o email do jogador para convidar",
      [
        // @ts-ignore
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Convidar",
          onPress: (email?: string) => {
            if (email) {
              Alert.alert("Convite Enviado", `Convite enviado para ${email}`);
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    Alert.alert(
      "Remover Membro",
      `Tem certeza que deseja remover ${memberName} da campanha?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => {
            Alert.alert("Membro Removido", `${memberName} foi removido da campanha`);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary font-semibold">← Voltar</Text>
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground">{campaign.name}</Text>
            <Text className="text-muted">{campaign.description}</Text>
          </View>

          {/* Campaign Info */}
          <View className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View className="flex-row justify-between">
              <Text className="text-muted">Criada:</Text>
              <Text className="text-foreground font-semibold">{campaign.createdAt}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted">Privacidade:</Text>
              <Text className="text-foreground font-semibold">
                {campaign.isPrivate ? "🔒 Privada" : "🌐 Pública"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted">Sessões:</Text>
              <Text className="text-foreground font-semibold">{campaign.sessions}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted">Membros:</Text>
              <Text className="text-foreground font-semibold">{campaign.members.length}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-lg p-3 items-center"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/sessions",
                  params: { campaignId: campaign.id },
                } as any)
              }
            >
              <Text className="text-white font-semibold">📹 Sessões</Text>
            </TouchableOpacity>
            {isMaster && (
              <TouchableOpacity
                className="flex-1 bg-surface border border-border rounded-lg p-3 items-center"
                onPress={handleInvitePlayer}
              >
                <Text className="text-foreground font-semibold">👥 Convidar</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Members Section */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">Membros ({campaign.members.length})</Text>

            {campaign.members.map((member) => (
              <View key={member.id} className="bg-surface rounded-lg p-4 border border-border gap-2">
                <View className="flex-row justify-between items-start">
                  <View className="gap-1 flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-foreground font-semibold">{member.name}</Text>
                      <View
                        className={`rounded-full px-2 py-1 ${
                          member.role === "master" ? "bg-primary" : "bg-warning"
                        }`}
                      >
                        <Text className="text-white text-xs font-semibold">
                          {member.role === "master" ? "👑" : "⚔️"}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-muted text-sm">{member.email}</Text>
                    <Text className="text-muted text-xs">Entrou {member.joinedAt}</Text>
                  </View>
                  {isMaster && member.role === "player" && (
                    <TouchableOpacity
                      onPress={() => handleRemoveMember(member.id, member.name)}
                    >
                      <Text className="text-error font-semibold">✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Campaign Settings */}
          {isMaster && (
            <View className="gap-3">
              <Text className="text-foreground font-semibold">Configurações</Text>

              <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <Text className="text-foreground font-semibold">Editar Campanha</Text>
                <Text className="text-muted">→</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border flex-row justify-between items-center">
                <Text className="text-foreground font-semibold">Arquivar Campanha</Text>
                <Text className="text-muted">→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-error/10 rounded-lg p-4 border border-error flex-row justify-between items-center"
                onPress={() => {
                  Alert.alert(
                    "Deletar Campanha",
                    "Tem certeza que deseja deletar esta campanha? Esta ação não pode ser desfeita.",
                    [
                      {
                        text: "Cancelar",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "Deletar",
                        onPress: () => {
                          Alert.alert("Campanha Deletada", "A campanha foi deletada com sucesso");
                          router.back();
                        },
                        style: "destructive",
                      },
                    ]
                  );
                }}
              >
                <Text className="text-error font-semibold">Deletar Campanha</Text>
                <Text className="text-error">→</Text>
              </TouchableOpacity>
            </View>
          )}

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
