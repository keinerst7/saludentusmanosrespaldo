import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target,
  Calendar,
  Plus,
  Brain,
  TrendingUp,
  Eye,
  Moon,
  Home,
  Smile,
  Award,
  Lightbulb,
  Zap
} from 'lucide-react';

interface DashboardProps {
  onNavigateToModule: (module: string) => void;
}

const Dashboard = ({ onNavigateToModule }: DashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Header del Dashboard centrado completamente */}
      <div className="flex justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            <Home className="w-8 h-8" />
            ¡Bienvenido!
          </h2>
          <p className="text-lg text-muted-foreground">
            Hoy es un gran día para cuidar de ti
          </p>
        </div>
      </div>

      {/* Estadísticas rápidas - solo las relacionadas con Bienestar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Meditación</p>
                <p className="text-2xl font-bold text-accent">5 sesiones</p>
              </div>
              <Brain className="w-8 h-8 text-accent" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigateToModule('wellness-meditation')}
                className="text-xs border-accent/20 hover:border-accent/40 hover:bg-accent/10"
              >
                <Plus className="w-3 h-3 mr-1" />
                Iniciar Sesión
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigateToModule('wellness-meditation')}
                className="text-xs border-accent/20 hover:border-accent/40 hover:bg-accent/10"
              >
                <Eye className="w-3 h-3 mr-1" />
                Ver Más
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-secondary/30 to-muted/30 border-secondary/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Bienestar</p>
                <p className="text-2xl font-bold text-accent">85%</p>
              </div>
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateToModule('wellness-mood')}
              className="w-full text-xs border-secondary/40 hover:border-secondary/60 hover:bg-secondary/20"
            >
              <Heart className="w-3 h-3 mr-1" />
              Registrar Estado
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Sueño</p>
                <p className="text-2xl font-bold text-blue-600">7.8h</p>
              </div>
              <Moon className="w-8 h-8 text-blue-600" />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateToModule('wellness-sleep')}
              className="w-full text-xs border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10"
            >
              <Plus className="w-3 h-3 mr-1" />
              Registrar Sueño
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Módulo principal de Bienestar */}
      <div className="max-w-2xl mx-auto">
        <Card className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-secondary/30 hover:border-secondary/50 cursor-pointer bg-gradient-to-br from-secondary/10 to-secondary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardContent className="p-8 text-center space-y-6 relative z-10" onClick={() => onNavigateToModule('wellness')}>
            <div className="mx-auto w-20 h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary/50 transition-colors shadow-lg">
              <Heart className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-accent mb-3">Bienestar</h3>
              <p className="text-muted-foreground">
                Control emocional, meditación y registro de sueño
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">💭 Estado Ánimo</Badge>
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">🧘 Meditación</Badge>
              <Badge variant="outline" className="text-xs bg-secondary/20 border-secondary/40">💤 Sueño</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mi Perfil como sección separada */}
      <Card className="group hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border-primary/20 hover:border-primary/40 cursor-pointer bg-gradient-to-r from-primary/5 to-primary-light/10"
            onClick={() => onNavigateToModule('profile')}>
        <CardContent className="p-6 flex items-center space-x-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-2">Mi Perfil</h3>
            <p className="text-sm text-muted-foreground">
              Información personal y logros de salud
            </p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="text-xs">Datos Personales</Badge>
              <Badge variant="outline" className="text-xs">Logros</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mensajes motivacionales en lugar de resumen semanal */}
      <Card className="bg-gradient-to-r from-accent-light/10 to-accent-lighter/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-light" />
                Consejos Motivacionales de Salud
              </CardTitle>
              <CardDescription>
                Mensajes diarios para inspirar tus buenos hábitos
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-card">
              <Calendar className="w-4 h-4 mr-1" />
              Hoy
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-lg border border-green-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Smile className="w-6 h-6 text-green-600 mr-2" />
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="text-sm font-bold text-green-600 mb-2">Actitud Positiva</h4>
              <p className="text-xs text-muted-foreground">
                "Una actitud positiva es la clave para una vida saludable. Cada día es una oportunidad para mejorar."
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-lg border border-blue-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Brain className="w-6 h-6 text-blue-600 mr-2" />
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="text-sm font-bold text-blue-600 mb-2">Mente Clara</h4>
              <p className="text-xs text-muted-foreground">
                "La meditación es como ejercicio para la mente. Fortalece tu capacidad de concentración y paz interior."
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-lg border border-purple-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Moon className="w-6 h-6 text-purple-600 mr-2" />
                <Heart className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-sm font-bold text-purple-600 mb-2">Descanso Reparador</h4>
              <p className="text-xs text-muted-foreground">
                "Un buen descanso nocturno es la base de un día productivo. Tu cuerpo se regenera mientras duermes."
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-lg border border-orange-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-orange-600 mr-2" />
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <h4 className="text-sm font-bold text-orange-600 mb-2">Progreso Constante</h4>
              <p className="text-xs text-muted-foreground">
                "Pequeños pasos diarios llevan a grandes cambios. La constancia es más importante que la perfección."
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-pink-500/5 to-pink-500/10 rounded-lg border border-pink-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-pink-600 mr-2" />
                <Smile className="w-4 h-4 text-pink-600" />
              </div>
              <h4 className="text-sm font-bold text-pink-600 mb-2">Autocuidado</h4>
              <p className="text-xs text-muted-foreground">
                "Cuidar de ti mismo no es egoísmo, es necesario. Eres tu prioridad número uno."
              </p>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 rounded-lg border border-cyan-500/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-3">
                <Lightbulb className="w-6 h-6 text-cyan-600 mr-2" />
                <Award className="w-4 h-4 text-cyan-600" />
              </div>
              <h4 className="text-sm font-bold text-cyan-600 mb-2">Hábitos Saludables</h4>
              <p className="text-xs text-muted-foreground">
                "Los hábitos saludables son inversiones en tu futuro. Cada buena decisión cuenta."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;