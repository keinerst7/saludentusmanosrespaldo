import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Target,
  Activity,
  Heart,
  TrendingUp,
  Camera,
  Edit,
  Save,
  CheckCircle,
  Apple,
  Droplets,
  Brain,
  Moon
} from 'lucide-react';

interface UserProfileProps {
  onBack: () => void;
  currentUser: string;
}

const UserProfile = ({ onBack, currentUser }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser,
    email: 'usuario@ejemplo.com',
    phone: '+1234567890',
    location: 'Ciudad, País',
    age: '30',
    goal: 'Mantener un estilo de vida saludable',
    bio: 'Comprometido con mi bienestar integral y crecimiento personal.',
    joinDate: '2024-01-01'
  });

  const [stats] = useState({
    totalWorkouts: 45,
    caloriesBurned: 12750,
    waterGoalsHit: 28,
    meditationMinutes: 320,
    avgMood: 4.2,
    weightLoss: 3.5,
    streakDays: 12
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí se guardarían los datos del perfil
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <User className="w-8 h-8" />
            Mi Perfil
          </h2>
          <p className="text-muted-foreground">
            Gestiona tu información personal y revisa tu progreso
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Volver al inicio
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Consejos y Motivacion
          </TabsTrigger>
        </TabsList>

        {/* Perfil Personal */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Información básica */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Información Personal</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Cambiar foto
                    </Button>
                  )}
                </div>

                {/* Campos de información */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">{profileData.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">{profileData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">{profileData.location}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objetivos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Objetivos de Salud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Objetivo principal</Label>
                  {isEditing ? (
                    <Textarea
                      id="goal"
                      value={profileData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="text-foreground">{profileData.goal}</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Miembro desde: {new Date(profileData.joinDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-full justify-center">
                      Racha actual: {stats.streakDays} días
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      Nivel: Intermedio
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Información de Salud */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Información de salud general */}
 

            {/* Logros recientes ampliados */}
            <div className="md:col-span-2 lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Consejos y Motivación</CardTitle>
                  <CardDescription>
                    Frases inspiradoras y consejos para mantener hábitos saludables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-700">Hidratación</p>
                        <p className="text-sm text-muted-foreground">"El agua es la fuente de la vida. Hidrátate y dale a tu cuerpo lo que necesita para brillar."</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Meditador Constante</p>
                        <p className="text-sm text-muted-foreground">"Cinco minutos de meditación pueden transformar tu día. La calma interior es tusuperpoder."</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Moon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-700">Buen Descanso</p>
                        <p className="text-sm text-muted-foreground">"Un buen descanso es la mejor medicina. Tu cuerpo se regenera mientras duermes."</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/10 to-pink-600/10 rounded-lg border border-pink-500/20">
                      <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium text-pink-700">Estado Positivo</p>
                        <p className="text-sm text-muted-foreground">"Cada pequeño hábito saludable es una semilla que plantás para tu futuro bienestar."</p>
                      </div>
                    </div>

 

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/20">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <Activity className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <p className="font-medium text-cyan-700">Equilibrio Mental</p>
                        <p className="text-sm text-muted-foreground">"Tu salud mental es tan importante como tu salud física. Cuida ambas con amor."</p>
                      </div>
                    </div>


                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 rounded-lg border border-indigo-500/20">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                        <Apple className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-700">Autocuidado</p>
                        <p className="text-sm text-muted-foreground">"No puedes servir desde un vaso vacío. Cuídate a ti mismo, porque tu bienestar es la base de todo lo que haces."</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Estadísticas */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-primary/10 to-primary-light/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Días Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">
                  {stats.streakDays}
                </div>
                <p className="text-sm text-muted-foreground">Días consecutivos</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Apple className="w-5 h-5 text-accent" />
                  Nutrición
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-1">
                  92%
                </div>
                <p className="text-sm text-muted-foreground">Objetivos cumplidos</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent-light/10 to-accent-lighter/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent-light" />
                  Bienestar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent-light mb-1">
                  {stats.avgMood}
                </div>
                <p className="text-sm text-muted-foreground">Promedio estado ánimo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Hidratación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-1">
                  {stats.waterGoalsHit}/30
                </div>
                <p className="text-xs text-muted-foreground">Metas de agua cumplidas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Meditación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent mb-1">
                  {stats.meditationMinutes}
                </div>
                <p className="text-xs text-muted-foreground">Minutos totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Racha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent-light mb-1">
                  {stats.streakDays}
                </div>
                <p className="text-xs text-muted-foreground">Días consecutivos</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Logros Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Primera Semana Completa</p>
                    <p className="text-sm text-muted-foreground">7 días seguidos de actividad</p>
                    <Badge variant="outline" className="mt-1 text-xs">¡Sigue así!</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Experto en Hidratación</p>
                    <p className="text-sm text-muted-foreground">Meta de agua cumplida 7 días</p>
                    <Badge variant="outline" className="mt-1 text-xs">Hidratación perfecta</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-accent-light/10 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent-light" />
                  </div>
                  <div>
                    <p className="font-medium">Meditador Constante</p>
                    <p className="text-sm text-muted-foreground">5 sesiones completadas</p>
                    <Badge variant="outline" className="mt-1 text-xs">Equilibrio mental</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Nutrición Balanceada</p>
                    <p className="text-sm text-muted-foreground">Macros equilibrados 5 días</p>
                    <Badge variant="outline" className="mt-1 text-xs">Alimentación saludable</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Sueño Reparador</p>
                    <p className="text-sm text-muted-foreground">7+ horas por 5 días</p>
                    <Badge variant="outline" className="mt-1 text-xs">Descanso óptimo</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Estado Positivo</p>
                    <p className="text-sm text-muted-foreground">Ánimo alto 3 días seguidos</p>
                    <Badge variant="outline" className="mt-1 text-xs">¡Buen humor!</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Progreso Constante</p>
                    <p className="text-sm text-muted-foreground">Mejora en todas las áreas</p>
                    <Badge variant="outline" className="mt-1 text-xs">Crecimiento integral</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;